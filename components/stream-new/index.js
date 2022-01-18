// @flow

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';
import type { BlogId, PostId } from 'kinja-magma/models/Id';
import type DiscussionSettings from 'kinja-magma/models/DiscussionSettings';
import type { KinjaMeta } from 'kinja-components/components/hoc/context';
import type { Lookup } from 'kinja-magma/utils/resolve';
import type { StoryCardProps } from '../story-cards-stream';
import type { PageType } from 'kinja-magma/models/PageType';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

/*
	These could be moved to some config istsead.
*/
// native ads will be inserted at these (zero-indexed) positions
export const FRONTPAGE_INSTREAM_NATIVE_AD_INDICES = [2, 5];
// mobile ads will be inserted before feed items in these (zero-indexed) positions
export const FRONTPAGE_INSTREAM_MOBILE_AD_INDICES = [0, 4, 8, 12, 16];

type FeedItemOptions = {
	isCommerce?: boolean,
	isRoundup?: boolean,
	withAuthorAvatar?: boolean,
	withPostTools?: boolean,
	embiggenPosts?: boolean,
	AsideToolsComponent?: React$Node,
	simpleEmbiggen?: boolean,
	withExcerpt?: boolean
};

export type FeedItemProps = StoryCardProps & FeedItemOptions;

type NativeStyleTemplate =
	| 'stream_list_item_test'
	| 'stream_list_item_v3'
	| 'stream_list_item_v4'
	| 'stream_list_item_v5'
	| 'stream_list_item_v5a'
	| 'stream_list_item_v6'
	| 'stream_list_item_v6a';

export type FeedStreamProps = FeedItemOptions & {
	blog?: Blog,
	posts: Array<Post>,
	// A lookup object for blogs of all posts
	authors?: Lookup<PostId, User>,
	pageType: PageType,
	repostBlogs?: Lookup<PostId, Blog>,
	parentBlogs?: { [BlogId]: Blog },
	discussionSettings?: Lookup<PostId, DiscussionSettings>,
	indices?: {|
		recentVideo?: Array<number>,
		instreamMobileAd?: Array<number>,
		instreamNativeAd?: Array<number>
	|},
	kinjaMeta?: KinjaMeta,
	isV2?: boolean,
	isV3?: boolean,
	nativeStyleTemplate?: NativeStyleTemplate,
	embeddedVideos?: Array<VideoMeta>
};

export { FeedStreamContainer } from './feed-stream-container';
export { default as FeedStream } from './feed-stream';
