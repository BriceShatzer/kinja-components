// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import EditorContext from '../../editor-context';
import simpleInlineNodes from '../components/simple-inlinenode-renderer';
import ContentEditable from 'react-contenteditable';
import exportInlineNodes from '../components/simple-inlinenode-exporter';
import type { InlineNode } from 'postbody/InlineNode';
import type { CardIndex } from '../../undo-stack';
import { stripHTMLWithRegex } from '../../../../utils/string';
import Analytics from '../../../hoc/analytics';
import type { AnalyticsInjectedProps } from '../../../hoc/analytics';
import { AdPlaceholderHeight } from '../../ad-placeholder';
import { SpaceBetweenBlocks } from '../../layouts/layout-styles';

export const editEffect = css`
	${props => props.canSelect && css`
		:hover {
			cursor: pointer;

			::after {
				content: ' ';
				position: absolute;
				top: var(--hover-and-selection-effect-spacing);
				right: var(--hover-and-selection-effect-spacing);
				bottom: var(--hover-and-selection-effect-spacing);
				left: var(--hover-and-selection-effect-spacing);
				${props => !props.isAd && css`
					background-color: ${props => props.whiteText ? props.theme.color.darkgray : props.theme.color.whitesmoke};
				`}
				${props => props.isAd && css`
					background-image: linear-gradient(
						${props => props.theme.color.whitesmoke},
						transparent 2rem,
						transparent calc(${AdPlaceholderHeight} + (2 * ${SpaceBetweenBlocks}) - 2rem),
						${props => props.theme.color.whitesmoke});
				`}
				border: 2px solid ${props => props.theme.color.midgray};
				border-radius: 5px;
				z-index: ${props => props.isAd ? '0' : '-1'};
			}
		}
	`}

	${props => props.isSelected && css`
		:hover {
			cursor: default;
		}

		::after,
		:hover::after {
			content: ' ';
			position: absolute;
			top: var(--hover-and-selection-effect-spacing);
			right: var(--hover-and-selection-effect-spacing);
			bottom: var(--hover-and-selection-effect-spacing);
			left: var(--hover-and-selection-effect-spacing);
			${props => !props.isAd && css`
				background-color: ${props => props.whiteText ? props.theme.color.darkgray : props.theme.color.backgroundLight};
			`}
			${props => props.isAd && css`
				background-image: linear-gradient(
					${props => props.theme.color.whitesmoke},
					transparent 2rem,
					transparent calc(${AdPlaceholderHeight} + (2 * ${SpaceBetweenBlocks}) - 2rem),
					${props => props.theme.color.whitesmoke});
			`}
			border: 2px solid ${props => props.theme.color.primary};
			border-radius: 5px;
			z-index: ${props => props.isAd ? '0' : '-1'};
		}
	`}
`;

export const StyledContentEditable = styled(ContentEditable)`
	outline: none;
	user-select: text;
`;

export const EditableTextfield = css`
	position: relative;
	z-index: 0;

	${props => props.isCardSelected && css`
		--hover-and-selection-effect-spacing: -0.25rem;
		${editEffect}

		${props => props.isSelected && css`
			::after,
			:hover::after {
				background-color: ${props => props.whiteText ? props.theme.color.darksmoke : props.theme.color.white};
			}
		`}
	`}
`;

export type Props = {|
	defaultValue: string,
	customValue: ?Array<InlineNode>,
	cardIndex: CardIndex,
	fieldName: 'customHeadline' | 'customExcerpt',
	container: ({ children: React.Node }) => React.Node,
	onStartEditing: () => void,
	onEndEditing: () => void,
	containerRef: { current: React.ElementRef<'div'> | null },
	whiteText: ?boolean,
	parentIsDraggable: boolean
|} & AnalyticsInjectedProps;

function EditableField(props: Props) {
	const {
		defaultValue,
		customValue,
		cardIndex,
		fieldName,
		container: Container,
		onStartEditing,
		onEndEditing,
		containerRef,
		ga,
		whiteText,
		parentIsDraggable
	} = props;
	const { selectedCardIndex, dispatch, editMode } = React.useContext(EditorContext);
	const renderedCustomValue = customValue && customValue.length ? simpleInlineNodes(customValue) : '';
	const value = stripHTMLWithRegex(renderedCustomValue).length > 0 ? renderedCustomValue : defaultValue;
	const [isEditingValue, setIsEditingValue] = React.useState(false);
	const [editValue, setEditValue] = React.useState<string>(value);
	const ref = React.useRef<HTMLElement | null>(null);
	// When the custom value changes (through the controller), set the current edit value
	React.useEffect(() => {
		setEditValue(value);
	}, [value]);
	// When the user clicks on the element, focus the contentEditable field
	// Also notify parent whenever we enter / leave edit mode
	React.useEffect(() => {
		if (isEditingValue) {
			ref.current && ref.current.focus();
			onStartEditing();
		} else {
			onEndEditing();
			if (containerRef.current && parentIsDraggable) {
				containerRef.current.setAttribute('draggable', 'true');
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isEditingValue, onStartEditing, onEndEditing, parentIsDraggable]);
	const isSelected = selectedCardIndex && selectedCardIndex[0] === cardIndex[0] && selectedCardIndex[1] === cardIndex[1];
	const onClickHandlerTwo = React.useCallback(
		() => editMode === 'CardEditing' && isSelected && !isEditingValue && setIsEditingValue(true),
		[editMode, isEditingValue, isSelected]
	);
	const onClickHandler = React.useCallback(() => {
		if (containerRef.current && !isEditingValue) {
			containerRef.current.removeAttribute('draggable');
			onClickHandlerTwo();
		}
	}, [containerRef, onClickHandlerTwo, isEditingValue]);
	const onChangeHandler = React.useCallback((e: SyntheticInputEvent<HTMLSpanElement>) => setEditValue(e.target.value), []);
	const onBlurHandler = React.useCallback((e: SyntheticInputEvent<HTMLSpanElement>) => {
		setIsEditingValue(false);
		const htmlValue = e.target.innerHTML;
		// If we have the default value set, but we had a custom value, reset the custom value to null
		if (customValue && htmlValue === defaultValue) {
			dispatch({
				type: 'UpdateCardAction',
				pos: cardIndex,
				update: {
					[fieldName]: null
				}
			});
			return;
		}
		// If the value didn't change, don't send an event, since it would push onto the undo stack
		if (htmlValue === defaultValue || (customValue && simpleInlineNodes(customValue) === htmlValue)) {
			return;
		}
		// If it was set on defaultValue, and we deleted everything, don't send an event but reset to defaultValue
		if (!customValue && !stripHTMLWithRegex(htmlValue)) {
			return setEditValue(defaultValue);
		}
		// Send change event
		dispatch({
			type: 'UpdateCardAction',
			pos: cardIndex,
			update: {
				[fieldName]: stripHTMLWithRegex(htmlValue).length > 0 ? exportInlineNodes(e.target) : null
			}
		});

		const gaEventLabel = fieldName === 'customHeadline' ? 'Article Headline Change' : 'Article Excerpt Change';
		ga('Curation Tools', `Curation Module - ${gaEventLabel}`);
	}, [cardIndex, customValue, defaultValue, dispatch, fieldName, ga]);
	const onKeyDownHandler = React.useCallback((e: SyntheticKeyboardEvent<HTMLSpanElement>) => {
		if (e.key === 'Enter' && e.target instanceof HTMLElement) {
			e.target.blur();
		}
	}, []);
	return (
		<Container
			isCardSelected={isSelected}
			isSelected={isEditingValue}
			onClick={onClickHandler}
			canSelect={editMode === 'CardEditing'}
			whiteText={whiteText}
		>
			<StyledContentEditable
				tagName="span"
				innerRef={ref}
				html={editValue}
				disabled={!isEditingValue}
				onChange={onChangeHandler}
				onBlur={onBlurHandler}
				onKeyDown={onKeyDownHandler}
			/>
		</Container>
	);
}
export default Analytics(EditableField);