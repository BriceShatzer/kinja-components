/* @flow */

import * as React from 'react';

import {
	CompactCard,
	EmbiggenedCard
} from '../story-cards-stream';

import { isLargeOnStream } from '../story-cards-stream/utils';

import type { FeedItemProps } from './';

/*
 * A single item in a post list feed, shorter excerpt version
 */
const FeedItem = ({
	blog,
	embiggenPosts = false,
	simpleEmbiggen = false,
	post,
	repostBlog,
	featuredVideo,
	...rest
}: FeedItemProps): React$Node => {
	return embiggenPosts && isLargeOnStream(post, blog, repostBlog, simpleEmbiggen) ? (
		<EmbiggenedCard
			blog={blog}
			post={post}
			repostBlog={repostBlog}
			isEmbiggened
			featuredVideo={featuredVideo}
			{...rest}
		/>
	) : (
		<CompactCard
			blog={blog}
			post={post}
			repostBlog={repostBlog}
			isEmbiggened={false}
			{...rest}
		/>
	);
};

export default FeedItem;
