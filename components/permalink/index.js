// @flow

import Permalink from './permalink';
import FeaturedPermalink from './featured-permalink';
import VideoPermalink from './video-permalink';
import SlideshowPermalink from './slideshow/slideshow-permalink';
import SidebarPost from 'kinja-magma/models/SidebarPost';

import type DiscussionSettings, { Participant } from 'kinja-magma/models/DiscussionSettings';
import type User from 'kinja-magma/models/User';
import type Blog from 'kinja-magma/models/Blog';
import type BlogSalesMetadata from 'kinja-magma/models/BlogSalesMetadata';
import type Link from 'kinja-magma/models/Link';
import type { PageType } from 'kinja-magma/models/PageType';
import type Post from 'kinja-magma/models/Post';
import type { KalaResponse } from 'kinja-magma/api/kala';
import type { AuthorUserPropertiesMap } from 'kinja-magma/models/UserProperty';
import type { PostNeighbors } from 'kinja-magma/models/Post';
import type SpecialSection from 'kinja-magma/models/SpecialSection';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type { CommerceModulePost } from 'kinja-components/components/sidebar/commerce/commerce-module-post';

export type PermalinkProps = {
	authors: Array<User>,
	blog: Blog,
	blogSales: ?BlogSalesMetadata,
	commercePermalinkPosts?: Array<CommerceModulePost>,
	defaultBlog?: ?Blog,
	discussionSetting?: DiscussionSettings,
	links: Array<Link>,
	embeddedVideos: Array<VideoMeta>,
	parentBlog: ?Blog,
	pageType: PageType,
	/**
	 * The post that is displayed in full
	 */
	starterPost: Post,
	/**
	 * The requested post can differ from the starter post in the case of a comment permalink
	 */
	requestedPost: Post,
	replyCount: number,
	likeCount: number,
	statsData: ?Array<KalaResponse>,
	authorUserProperties: ?AuthorUserPropertiesMap,
	relatedBlogs?: Array<Blog>,
	relatedPosts?: Array<Post>,
	adsEnabled?: boolean,
	features?: { [name: string]: boolean },
	featuredVideo?: VideoMeta,
	moreOnPosts?: ?Array<Post>,
	postNeighbors: PostNeighbors,
	isGoogleNewsBot: ?boolean,
	specialSectionBlog: ?Blog,
	specialSectionData: ?SpecialSection,
	isDraft?: ?boolean,
	isShowcase?: ?boolean,
	token?: ?string,
	slideIndex?: ?number,
	popularPosts?: Array<SidebarPost>,
	qAndAParticipants?: ?Array<Participant>,
	videoPermalinkRecircPosts?: {
		popularVideoPosts?: Array<SidebarPost>,
		recentVideoPosts?: Array<SidebarPost>
	},
	withoutTaboola?: boolean,
	commentsIframeUrl: string
};

export {
	Permalink,
	FeaturedPermalink,
	VideoPermalink,
	SlideshowPermalink
};

export default Permalink;
