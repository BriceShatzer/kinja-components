// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import type CategorizedPost from 'kinja-magma/models/CategorizedPost';
import EditorContext from '../editor-context';
import EditableCard from './editable-card';
import StaticCard from './static-card';
import EmptyCard from './empty-card';
import type { InlineNode } from 'postbody/InlineNode';
import StandardBlockDataContext from '../standard-block-data-context';
import Analytics from '../../hoc/analytics';
import type { AnalyticsInjectedProps } from '../../hoc/analytics';
import type { SimpleImageJSON } from 'kinja-magma/models/SimpleImage';

export type Props = {|
	post: ?Post,
	showExcerpt?: boolean,
	showThumbnail?: boolean,
	className?: string,
	blockIndex: number,
	index: number,
	showAuthors?: boolean,
	showPublishTime?: boolean,
	imageSizes?: string,
	whiteText?: boolean,
	bigStory?: boolean,
	customStoryLabel?: ?string,
|}

export type NonEmptyCardProps = {|
	...Props,
	post: Post,
	categorizedPost: ?CategorizedPost,
	isAutofill: boolean,
	customHeadline: ?Array<InlineNode>,
	customExcerpt: ?Array<InlineNode>,
	customThumbnail: ?SimpleImageJSON,
	showAuthors?: boolean,
	showPublishTime?: boolean,
	whiteText?: boolean,
	bigStory?: boolean
|}


function Card(props: Props & AnalyticsInjectedProps): React.Node {
	const {
		post,
		showAuthors = true,
		showPublishTime = false,
		imageSizes,
		blockIndex,
		index,
		ga,
		whiteText = false,
		bigStory = false,
		customStoryLabel
	} = props;
	const { editMode, dispatch } = React.useContext(EditorContext);
	const { categorizedPosts, block } = React.useContext(StandardBlockDataContext);
	const { autofill, cards } = block;
	const isAutofill = Boolean(autofill);
	const categorizedPost = post ? categorizedPosts.find(c => c.post === post.id) : null;
	const card = post ? cards.find(c => c && c.postId === post.id) : null;
	const onDragStart = React.useCallback(() => {
		if (editMode === 'CardEditing') {
			dispatch({ type: 'SelectCardAction', pos: [blockIndex, index] });
			dispatch({ type: 'CardDragStartAction' });
		}
	}, [dispatch, blockIndex, index, editMode]);
	const onDragEnd = React.useCallback(() => {
		if (editMode === 'CardEditing') {
			dispatch({ type: 'CardDragEndAction' });
		}
	}, [dispatch, editMode]);
	const onDrop = React.useCallback(to => {
		if (editMode === 'CardEditing') {
			dispatch({ type: 'SwapCardsAction', to });
			ga('Curation Tools', 'Curation Module - Article Position Change');
		}
	}, [dispatch, ga, editMode]);

	if (editMode && props.post) {
		return <EditableCard
			showExcerpt={props.showExcerpt}
			showThumbnail={props.showThumbnail}
			categorizedPost={categorizedPost}
			className={props.className}
			blockIndex={props.blockIndex}
			index={props.index}
			post={props.post}
			isAutofill={isAutofill}
			customStoryLabel={customStoryLabel}
			customHeadline={card ? card.customHeadline : null}
			customExcerpt={card ? card.customExcerpt : null}
			customThumbnail={card ? card.customThumbnail : null}
			showAuthors={showAuthors}
			onDragStart={isAutofill ? null : onDragStart}
			onDragEnd={isAutofill ? null : onDragEnd}
			onDrop={isAutofill ? null : onDrop}
			showPublishTime={showPublishTime}
			whiteText={whiteText}
			bigStory={bigStory}
		/>;
	}
	if (props.post) {
		return <StaticCard
			showExcerpt={props.showExcerpt}
			showThumbnail={props.showThumbnail}
			categorizedPost={categorizedPost}
			className={props.className}
			blockIndex={props.blockIndex}
			index={props.index}
			post={props.post}
			isAutofill={isAutofill}
			customStoryLabel={customStoryLabel}
			customHeadline={card ? card.customHeadline : null}
			customExcerpt={card ? card.customExcerpt : null}
			customThumbnail={card ? card.customThumbnail : null}
			blockLayout={block.layout}
			showAuthors={showAuthors}
			showPublishTime={showPublishTime}
			imageSizes={imageSizes}
			whiteText={whiteText}
			bigStory={bigStory}
		/>;
	}
	if (editMode) {
		return <EmptyCard
			blockIndex={props.blockIndex}
			index={props.index}
			className={props.className}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
			onDrop={onDrop}
		/>;
	}
	return null;
}

export default Analytics(Card);
