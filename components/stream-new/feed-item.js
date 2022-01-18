/* @flow */

import * as React from 'react';

import {
	StoryCardCompact,
	StoryCardEmbiggened
} from '../story-cards-stream';

import { PostToolsWrapper } from '../post-tools';
import { isLargeOnStream } from '../story-cards-stream/utils';
import trimExcerpt from 'postbody/utils/trimExcerpt';
import { parseNode } from 'postbody/BlockNode';

import type { FeedItemProps } from './';
import { postRelatedValues } from 'kinja-components/components/hoc/context';

/*
 * A single item in a post list feed, shorter excerpt version
 */
const FeedItem = ({
	post,
	index,
	isCommerce,
	isRoundup,
	excerpt,
	pageType,
	withPostTools = false,
	withExcerpt,
	embiggenPosts = false,
	simpleEmbiggen = false,
	blog,
	repostBlog,
	kinjaMeta,
	withBranding,
	...rest
}: FeedItemProps): React$Node => {

	const kinjaMetaWithPost = {
		...kinjaMeta,
		...postRelatedValues(post)
	};

	const postToolsContents = withPostTools
		? <PostToolsWrapper type={'stream'} post={post} index={index} pageType={pageType} />
		: null;

	const postExcerpt = withExcerpt &&
						(isCommerce || isRoundup) &&
						post.firstParagraph ? trimExcerpt([parseNode(post.firstParagraph)], 117) : excerpt;

	return embiggenPosts && isLargeOnStream(post, blog, repostBlog, simpleEmbiggen) ? (
		<StoryCardEmbiggened
			post={post}
			postToolsContents={postToolsContents}
			excerpt={excerpt}
			index={index}
			pageType={pageType}
			blog={blog}
			repostBlog={repostBlog}
			kinjaMeta={kinjaMetaWithPost}
			{...rest}
		/>
	) : (
		<StoryCardCompact
			post={post}
			postToolsContents={postToolsContents}
			excerpt={postExcerpt}
			index={index}
			pageType={pageType}
			blog={blog}
			repostBlog={repostBlog}
			withExcerpt={withExcerpt && (isCommerce || isRoundup)}
			kinjaMeta={kinjaMetaWithPost}
			withBranding={withBranding}
			{...rest}
		/>
	);
};

export default FeedItem;
