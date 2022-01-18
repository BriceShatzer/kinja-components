// @flow

import * as React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import EditorContext from './editor-context';
import { editEffect } from './cards/components/editable-field';
import LoadingIcon from '../icon19/Loading';

export const Container = styled.div`
	position: relative;

	--hover-and-selection-effect-spacing: -0.5rem;
	${editEffect};
`;

const LoadingOverlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(255, 255, 255, 0.9);
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	color: ${props => props.theme.color.darkgray};
	font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.small :
		props.theme.typography.headline.fontSizes.small};
	line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.small :
		props.theme.typography.headline.lineHeights.small};

	svg {
		width: 54px;
		height: 54px;
	}
`;

function Loading() {
	return (
		<LoadingOverlay>
			<LoadingIcon />
			Loading block...
		</LoadingOverlay>
	);
}

type Props = {|
	children: React.Node,
	index: number,
	isAd?: boolean
|}

export default function EditableLayout(props: Props) {
	const { selectedBlockIndex, dispatch, editMode, loadingBlocks } = React.useContext(EditorContext);
	const { index, isAd } = props;
	const isLoading = loadingBlocks.includes(index);
	const isSelected = editMode === 'BlockEditing' && selectedBlockIndex === index && !isLoading;
	const isSelectable = editMode === 'BlockEditing' && !isSelected && !isLoading;
	const onClickCallback = React.useCallback(
		() => isSelectable && dispatch({ type: 'SelectBlockAction', index }),
		[dispatch, isSelectable, index]);
	const blockElement = React.useRef();

	// Using a ref to store the previous index: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
	const prevIndex = React.useRef();

	// When a block is moved (the index changes), scroll the block into view.
	const shouldScrollToBlock = isSelected && prevIndex.current !== index;

	React.useEffect(() => {
		if (shouldScrollToBlock) {
			const offset = 48 + 96; // Toolbar height and some breathing room to show context

			if (blockElement.current) {
				window.scrollTo(0, blockElement.current.offsetTop - offset);
			}
		}
	}, [index, shouldScrollToBlock]);

	React.useEffect(() => {
		prevIndex.current = index;
	});

	return (
		<Container
			onClick={onClickCallback}
			isSelected={isSelected}
			canSelect={editMode === 'BlockEditing' && !isLoading}
			ref={blockElement}
			isAd={isAd}
			className={classnames(
				isSelected ? 'isSelected' : '',
				editMode === 'BlockEditing' && !isLoading ? 'canSelect' : ''
			)}
		>
			{props.children}
			{isLoading && <Loading />}
		</Container>
	);
}