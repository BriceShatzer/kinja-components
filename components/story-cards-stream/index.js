// @flow

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';
import type { PageType } from 'kinja-magma/models/PageType';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type { BlockNode } from 'postbody/BlockNode';
import type { KinjaMeta } from 'kinja-components/components/hoc/context';
import type { RecircGroup } from 'kinja-components/components/types';
import type { ReactComponentStyled } from 'styled-components';

export type StoryCardProps = {
	AsideToolsComponent?: ReactComponentStyled,
	authors?: Array<User>,
	blog?: Blog, // The blog rendering the short feed
	className?: string,
	defaultBlog?: Blog,
	defaultBlogDisplayName?: ?string,
	defaultBlogGroup?: ?string,
	defaultBlogName?: ?string, // The blog the post was shared from
	defaultBlogRecircGroup?: ?RecircGroup,
	excerpt?: Array<BlockNode>, // When an excerpt is set the card will render the nodes as the excerpt
	hideAuthors?: boolean,
	index: number,
	isCommerce?: boolean,
	isCommercePost?: boolean,
	isEmbiggened?: boolean,
	isExternal?: boolean,
	isExternalNativeAd?: boolean,
	isExternalPost?: boolean,
	isLive?: boolean,
	isLivePost?: boolean,
	isNative?: boolean,
	isNativeAd?: boolean,
	isSaved?: boolean,
	isSpliced?: boolean,
	isSplicedPost?: boolean,
	isSponsored?: boolean,
	isSponsoredPost?: boolean,
	isV3?: boolean,
	kinjaMeta?: KinjaMeta,
	pageType: PageType,
	parentBlogName?: string,
	post: Post,
	postToolsContents?: React$Node,
	repostBlog?: ?Blog,
	saveClickHandler?: mixed,
	shouldShowStoryTypes?: boolean,
	withAuthorAvatar?: boolean,
	withBranding?: boolean,
	withExcerpt?: boolean,
	oneRowOnMobile?: boolean,
	featuredVideo?: ?VideoMeta
};

// Phase 1 design
export { default as StoryCardCompact } from './story-card-compact';
export { default as StoryCardEmbiggened } from './story-card-embiggened';

// Phase 2 design
export { default as CompactCard } from './compact';
export { default as EmbiggenedCard } from './embiggened';
