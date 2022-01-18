// @flow

import * as React from 'react';
import type Link from 'kinja-magma/models/Link';
import type { BlockNodeJSON } from 'postbody/BlockNode';
import type { FunctionOrClassComponent } from '../../../utils/types';

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type BlogSalesMetadata from 'kinja-magma/models/BlogSalesMetadata';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type StoryType from 'kinja-magma/models/StoryType';
import type { CommerceModulePost } from 'kinja-components/components/sidebar/commerce/commerce-module-post';

export type RendererConfig = {
	attributionsEnabled?: boolean, // Whether image attributions should be enabled for Image nodes
	captionsEnabled?: boolean, // Whether captioning should be enabled for Image nodes
	insetPrefix?: string, // What prefix the embedded links should appear on (where the iframe url should point) eg kinja.com
	shouldAffiliatizeAmazonUris?: boolean, // Should amazon urls be decorating using amazon affiliate tags?
	adsEnabled?: boolean, // Whether any ads should be displayed
	disablePullQuoteBranding?: boolean, // Right now used in comments where we don't want to brand PullQuotes
	embedHost?: string, // The host name to use in embed URLs
	clientRendering?: boolean,
	rssFeedType?: string
};

export type KinjaMeta = {|
	config?: RendererConfig,
	features?: ?{ [name: string]: boolean },
	links?: Array<Link>, // The links in the current post of the rendering context
	embeddedVideos?: Array<VideoMeta>, // Metadata for videos embedded in post
	experimentId?: string, // ga AB testing experiment id
	experimentVariation?: string, // ga AB testing experiment variation

	// BlogSales related values
	amazonAffiliateTag?: string, // Amazon affiliate tag to be used for decorating urls so we get commission
	adNetworkId?: ?number,
	adSiteName?: ?string,
	indexExchangeAmpSiteId?: ?string,

	// Blog related values (The blog the user is currently on)
	blogGroup?: string, // The blogGroup of the blog we are currently on
	blogName?: string, // Name of the blog we're currently on
	isGmgBlog?: boolean, // Whether the blog we're currently on is a gmg blog
	language?: string, // The blog's locale setting to be used for i18n of strings

	// Post related values
	authorId?: string, // Id of the author of the post of the current context
	category?: ?string, // The category for a post
	subcategory?: ?string, // The subcategory for a post
	categoryData?: ?TypedTagData,
	subcategoryData?: ?TypedTagData,
	storyType?: ?StoryType,
	postApproved?: ?boolean, // Whether the post of the current context is approved
	postHeadline?: ?string, // Headline of the post of the current context
	postId?: string, // Id of the post of the current context
	mainMedia?: ?BlockNodeJSON, // A node pulled from the body to represent the post on stream pages, in the sidebar, etc
	starterPost?: boolean, // Whether the post of the current context is a starter post
	facebookShareUrl?: string, // The url to be used for sharing the current post on facebook
	twitterShareUrl?: string, // The url to be used for sharing the current post on twitter
	permalinkUrl?: string, // The url of the permalink of the current post
	permalinkHost?: string, // The url of the permalink of the current post
	sponsored?: boolean, // Whether we are on a sponsored post,
	postIsFeatured?: boolean, // If the post is a Featured Post,
	postIsVideo?: boolean, // If the post is a Video Post
	postIsSlideshow?: boolean, // If the post is a Slideshow Post
	adZone?: string, // Determines which ads will display on the post
	dropCapEnabled?: ?boolean, // Whether post should start with a drop capital letter,
	isSecondScroll?: boolean, // Whether the current post appears in the second scroll slot
	tags?: ?Array<string>,
	pageType?: string,
	isNewLatestPage?: boolean,
	disableAds?: boolean,
	commercePermalinkPosts?: ?Array<CommerceModulePost>
|};

export type KinjaMetaInjectedProps = {
	kinjaMeta: KinjaMeta
}

export function postRelatedValues(post: Post): KinjaMeta {
	return {
		authorId: post.authorId || '',
		category: post.category,
		subcategory: post.subcategory,
		categoryData: post.categoryData,
		subcategoryData: post.subcategoryData,
		storyType: post.storyType,
		postApproved: post.approved,
		postHeadline: post.headline,
		postId: post.id,
		mainMedia: post.mainMedia,
		starterPost: post.isStarter,
		facebookShareUrl: post.facebookShareUrl,
		twitterShareUrl: post.twitterShareUrl,
		permalinkUrl: post.permalink,
		sponsored: post.sponsored,
		postIsFeatured: post.isFeatured,
		adZone: post.adZone || '',
		dropCapEnabled: post.dropCapEnabled || null,
		tags: (post.tags || []).map(tag => tag.safeName)
	};
}

export function blogRelatedValues(blog: Blog): KinjaMeta {
	return {
		blogName: blog ? blog.name : '',
		isGmgBlog: blog && blog.properties.isGmgBlog,
		blogGroup: blog.blogGroup,
		language: blog.locale
	};
}

export function blogSalesRelatedValues(blogSales: BlogSalesMetadata): KinjaMeta {
	return {
		amazonAffiliateTag: blogSales && blogSales.amazonAffiliateTag || '',
		adNetworkId: blogSales.adNetworkId,
		adSiteName: blogSales.adSiteName,
		indexExchangeAmpSiteId: blogSales.indexExchangeAmpSiteId
	};
}

const KinjaMetaContext: React.Context<KinjaMeta> = React.createContext({
	// at least one object property is needed for the default to avoid a flow error
	config: {}
});

export const KinjaMetaProvider = KinjaMetaContext.Provider;
export const KinjaMetaConsumer = KinjaMetaContext.Consumer;

export const withKinjaMeta = <Props: KinjaMetaInjectedProps, State>(
	Component: FunctionOrClassComponent<Props, State>
): React.StatelessFunctionalComponent<$Diff<Props, KinjaMetaInjectedProps>> => {
	const WithKinjaMeta = (props: $Diff<Props, KinjaMetaInjectedProps>) => (
		<KinjaMetaConsumer>
			{(value: KinjaMeta) => <Component {...props} kinjaMeta={value} />}
		</KinjaMetaConsumer>
	);
	return WithKinjaMeta;
};

type Platform = 'web' | 'amp' | 'rss';

export type PlatformInjectedProps = {
	platform?: Platform
}

const PlatformContext: React.Context<Platform> = React.createContext('web');

export const PlatformProvider = PlatformContext.Provider;
export const PlatformConsumer = PlatformContext.Consumer;

export const withPlatform = <Props: PlatformInjectedProps, State>(
	Component: FunctionOrClassComponent<Props, State>
): React.StatelessFunctionalComponent<$Diff<Props, PlatformInjectedProps>> => {
	const WithPlatform = (props: $Diff<Props, PlatformInjectedProps>) => (
		<PlatformConsumer>
			{(value: Platform) => <Component {...props} platform={value} />}
		</PlatformConsumer>
	);
	return WithPlatform;
};

type Features = ?{ [name: string]: boolean };

export type FeaturesInjectedProps = {
	features?: Features,
}

const FeaturesContext: React.Context<Features> = React.createContext({});

export const FeaturesProvider = FeaturesContext.Provider;
export const FeaturesConsumer = FeaturesContext.Consumer;

export const withFeatures = <Props: FeaturesInjectedProps, State>(
	Component: FunctionOrClassComponent<Props, State>
): React.StatelessFunctionalComponent<$Diff<Props, FeaturesInjectedProps>> => {
	const WithFeatures = (props: $Diff<Props, FeaturesInjectedProps>) => (
		<FeaturesConsumer>
			{(value: Features) => <Component {...props} features={value} />}
		</FeaturesConsumer>
	);
	return WithFeatures;
};
