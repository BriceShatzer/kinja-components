// @flow

import type { PageType } from 'kinja-magma/models/PageType';
import type Post from 'kinja-magma/models/Post';
import type { PostId, BlogId, UserId } from 'kinja-magma/models/Id';
import type { PostStatus } from 'kinja-magma/models/PostStatus';

type PostToolsType =  'permalink' | 'stream';

/*
  Server-side only.
*/
export type PostToolsWrapperProps = {
	type: PostToolsType,
	post: Post,
	pageType: PageType,
	index: number
}

/*
  Callbacks that are accessible by post tools component
*/
export type PostToolsTopLevelCallbacks = {
	dropdownClickHandler?: () => void
}

/*
  Callbacks that are in the post tools dropdown
*/
export type PostToolsCallbacks = PostToolsTopLevelCallbacks & {
	editClickHandler?: () => void,
	embiggenClickHandler?: (isEmbiggened: boolean) => void,
	dismissClickHandler?: (isDismissed: boolean) => void,
	blockClickHandler?: ({
		userId: UserId, blogId: BlogId, userName: string, blogName: string, isBlocked: boolean
	}) => void,
	sendToEditorsClickHandler?: () => void,
	promoteClickHandler?: () => void,
	shareClickHandler?: () => void,
	unshareClickHandler?: () => void,
	initializeInArticleAdTools?: () => void,
	changeInArticleVideoClickHandler?: () => void,
	toggleConversationToolsClickHandler?: () => void
}

/*
  Used to hydrate share tools
*/
export type PostShareUrls = {
	permalink: string,
	twitterShareUrl: string,
	facebookShareUrl: string,
	emailShareUrl: string
}

/*
  Used client- and server-side.
  Needed for rendering and hydration, stored as DOM attributes.
*/
export type PostToolsData = {
	/*
		PostTools are used in streams and permalink pages, looking and behaving differently,
		but sharing components and logic, this prop switches between the two versions.
		NOTE: What is currently PostTools can be removed entirely, and these two (or any other)
		versions composed instead wherever needed (since the current PostTools does nothing other
		than compose one of the two based on the values of this prop, pageType, and callbacks
		passed in).
	*/
	type: PostToolsType,

	postId: PostId,
	authorIds: Array<UserId>,
	sharedToBlogId: ?BlogId,
	postPermalink: string,
	status: ?PostStatus,
	wordCount: number,
	isFeatured: boolean,
	isVideo: boolean,
	isEmbiggened: boolean,
	isDismissed: boolean,
	isBlocked: boolean,
	index: number,
	pageType: PageType,
	parentId: ?PostId,
	parentAuthorId: ?UserId,
	defaultBlogId: BlogId,
	defaultBlogDisplayName?: string,
	authorName?: string
}

export type PostToolsProps = PostToolsData & PostToolsTopLevelCallbacks & {
	dropdownContents?: React.Node
};

export * from './post-tools';
export * from './post-tools-frontpage';
export * from './post-tools-permalink';
export * from './post-tools-stream';
export * from './post-tools-wrapper';
