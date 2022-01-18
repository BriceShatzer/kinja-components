// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import CardImage from './components/image';
import { parseNode } from 'postbody/BlockNode';
import CategorizationLabel from './components/categorization-label';
import EditorContext from '../editor-context';
import type { NonEmptyCardProps } from './card';
import {
	TextContainer,
	CardContainer,
	MonochromeLabel,
	Timestamp,
	BigStoryLabel,
	MultipleAuthorsContainer
} from './static-card';
import simpleInlineNodes from './components/simple-inlinenode-renderer';
import Headline from './components/headline';
import Excerpt from './components/excerpt';
import Paragraph from 'postbody/blockNodes/Paragraph';
import trimExcerpt from 'postbody/utils/trimExcerpt';
import Analytics from '../../hoc/analytics';
import type { AnalyticsInjectedProps } from '../../hoc/analytics';
import EditableField, { EditableTextfield, editEffect } from './components/editable-field';
import ReviewScore, { ReviewBadge, MediumSize } from 'kinja-components/components/review-score/review-score';
import MultipleAuthorsStatic from 'kinja-components/components/post-elements/multiple-authors-static/multiple-authors-static';
import StandardBlockDataContext from '../standard-block-data-context';
import DragAndDropHOC, { type DragAndDropProps, type DragAndDropInjectedProps } from '../hoc/drag-and-drop';
import DateTime from 'kinja-components/utils/DateTime';

export const DisabledEditableCardContainer = styled(CardContainer)`
	position: relative;
	opacity: 0.4;
`;

export const EditableCardContainer = styled(CardContainer)`
	--hover-and-selection-effect-spacing: -0.5rem;
	position: relative;
	outline: 0;
	${editEffect}
	:hover {
		::after {
			z-index: -2;
		}
	}

	${props => props.isSelected && css`
		:hover {
			::after {
				z-index: -2;
			}
		}
	`}
`;

const EditableHeadline = styled(Headline)`
	${EditableTextfield}

	${({ isSelected }) => isSelected && css`
		:hover {
			cursor: text;
		}
	`}
`;

const EditableExcerpt = styled(Excerpt)`
	${EditableTextfield}

	${({ isSelected }) => isSelected && css`
		:hover {
			cursor: text;
		}
	`}
`;

export const CardImageWrapper = styled.div`
	position: relative;

	${ReviewBadge} {
		${MediumSize}
	}
`;

type EditableCardProps = {|
	...NonEmptyCardProps,
	...DragAndDropProps,
	...DragAndDropInjectedProps
|} & AnalyticsInjectedProps;

function EditableCard(props: EditableCardProps) {
	const {
		post,
		showExcerpt,
		showThumbnail = true,
		categorizedPost,
		className,
		blockIndex,
		index,
		isAutofill,
		customStoryLabel,
		customHeadline,
		customExcerpt,
		customThumbnail,
		showAuthors,
		eventProps,
		showPublishTime,
		ga,
		whiteText,
		bigStory
	} = props;
	const { selectedCardIndex, dispatch, editMode, addPost } = React.useContext(EditorContext);
	const { isSatire, authors } = React.useContext(StandardBlockDataContext);
	const firstParagraph = post.firstParagraph ? trimExcerpt([parseNode(post.firstParagraph)], 250)[0] : null;
	const firstParagraphValue = firstParagraph instanceof Paragraph ? firstParagraph.value : null;
	const defaultExcerpt = firstParagraphValue ? simpleInlineNodes(firstParagraphValue) : '';
	const storyType = categorizedPost ? categorizedPost.storyType : undefined;
	const category = categorizedPost ? categorizedPost.category : undefined;
	const subCategory = categorizedPost ? categorizedPost.subcategory : undefined;
	const isSelected = editMode === 'CardEditing' && selectedCardIndex && selectedCardIndex[0] === blockIndex && selectedCardIndex[1] === index;
	const Container = isAutofill ? DisabledEditableCardContainer : EditableCardContainer;
	const allAuthors = authors[post.id];
	const [isEditing, setIsEditing] = React.useState(false);
	const timestamp = post.publishTimeMillis;

	React.useEffect(() => {
		if (!isSelected) {
			setIsEditing(false);
		}
	}, [isSelected]);
	const startEditingCallback = React.useCallback(() => setIsEditing(true), []);
	const endEditingCallback = React.useCallback(() => setIsEditing(false), []);
	const onClickCallback = React.useCallback(
		() => editMode === 'CardEditing' && !isAutofill && !isSelected && dispatch({ type: 'SelectCardAction', pos: [blockIndex, index] }),
		[editMode, isAutofill, isSelected, dispatch, blockIndex, index]
	);
	const onKeyDownCallback = React.useCallback(
		(e: SyntheticKeyboardEvent<HTMLElement>) => {
			if (isSelected && (e.key === 'Backspace' || e.key === 'Delete') && !isEditing) {
				dispatch({ type: 'RemoveSelectedCardAction' });
				ga('Curation Tools', 'Curation Module - Delete Article');
			}
		},
		[isSelected, isEditing, dispatch, ga]
	);
	const cardIndex = React.useMemo(() => [blockIndex, index], [blockIndex, index]);
	const onPasteCallback = React.useCallback(
		(e: SyntheticClipboardEvent<HTMLElement>) => {
			if (isEditing) {
				return;
			}
			const text = e.clipboardData.getData('Text');
			if (text) {
				dispatch({ type: 'RemoveSelectedCardAction' });
				addPost(cardIndex, text);
			}
		},
		[cardIndex, dispatch, addPost, isEditing]
	);
	const containerRef = React.createRef();
	const isDraggable = editMode === 'CardEditing' && !isAutofill;
	return (
		<Container
			className={`${className || ''} js_homepage-editable-card`}
			onClick={onClickCallback}
			onKeyDown={onKeyDownCallback}
			tabIndex={isAutofill ? undefined : -1}
			isSelected={isSelected}
			canSelect={editMode === 'CardEditing'}
			onPaste={onPasteCallback}
			data-index={cardIndex}
			// Passing down props from DragAndDropHOC
			{...eventProps}
			draggable={isDraggable}
			ref={containerRef}
			data-id={post.id}
		>
			{showThumbnail &&
				<CardImageWrapper>
					{post.reviewScore && <ReviewScore score={post.reviewScore} />}
					<CardImage
						customImage={customThumbnail}
						post={post}
						aboveHeadline
						draggable={false}
						noLazy
					/>
				</CardImageWrapper>
			}
			<TextContainer whiteText={whiteText}>
				{post.sponsored ? (
					<MonochromeLabel whiteText={whiteText}>Sponsored</MonochromeLabel>
				) : (bigStory ? (
					<BigStoryLabel whiteText={whiteText}>{customStoryLabel || 'The Big Story'}</BigStoryLabel>
				) : (storyType &&
					<CategorizationLabel
						permalinkHost={post.permalinkHost}
						storyType={storyType}
						category={category}
						subcategory={subCategory}
						disableLink
					/>
				))}
				<EditableField
					defaultValue={post.formattedHeadline}
					customValue={customHeadline}
					cardIndex={cardIndex}
					fieldName="customHeadline"
					container={EditableHeadline}
					onStartEditing={startEditingCallback}
					onEndEditing={endEditingCallback}
					whiteText={whiteText}
					containerRef={containerRef}
					parentIsDraggable={isDraggable}
				/>
				{showExcerpt && (
					<EditableField
						defaultValue={defaultExcerpt}
						customValue={customExcerpt}
						cardIndex={cardIndex}
						fieldName="customExcerpt"
						container={EditableExcerpt}
						onStartEditing={startEditingCallback}
						onEndEditing={endEditingCallback}
						whiteText={whiteText}
						containerRef={containerRef}
						parentIsDraggable={isDraggable}
					/>
				)}
				{!isSatire && showAuthors && (
					<MultipleAuthorsContainer>
						{post.byline || (allAuthors && allAuthors.length && (
							<MultipleAuthorsStatic
								authors={allAuthors}
								index={index}
								pageType={'frontpage'}
								noLink={true}
								truncated
							/>
						))}
					</MultipleAuthorsContainer>
				)}
				{showPublishTime && timestamp && (
					<Timestamp>{new DateTime({ timestamp }).relativeDateTime}</Timestamp>
				)}
			</TextContainer>
		</Container>
	);
}

export default DragAndDropHOC(Analytics(EditableCard));
