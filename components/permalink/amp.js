// @flow

import * as React from 'react';
import styled from 'styled-components';

import Theme from '../theme';
import config from 'kinja-magma/config';
import { parseNode } from 'postbody/BlockNode';
import { AmpBlockNodeListWithAds } from '../postbody/block-node-list/block-node-list';
import BlockNodeList from '../postbody/block-node-list';
import ampRenderNode from '../postbody/block-node-list/amp-render-node';
import SharingFooter from '../post-elements/sharing-footer';
import CommerceDisclaimer from '../post-elements/commerce-disclaimer';
import Headline from '../post-elements/headline/permalink-headline';
import PermalinkRelatedStories from '../post-elements/permalink-related-stories';
import AuthorBio from '../author-bio';
import { AuthorBioWrapper } from '../author-bio/author-bio-style';
import AmpTaboola from '../amp-taboola';
import AmpComments from './amp-comments';
import AmpSkimlinks from '../amp-skimlinks';
import { isVideo } from '../../../postbody/ads/ad-placements-utils';
import {
	KinjaMetaProvider,
	PlatformProvider
} from '../hoc/context';
import {
	blogRelatedValues,
	blogSalesRelatedValues,
	postRelatedValues
} from '../hoc/context';
import PermalinkByline from '../post-elements/permalink-byline';
import { shouldHideAuthorsBasedOnBlog } from 'kinja-components/components/post-elements/byline/byline';

import Post from 'kinja-magma/models/Post';
import type User from 'kinja-magma/models/User';
import type Blog from 'kinja-magma/models/Blog';
import type { KinjaMeta } from '../hoc/context';
import type BlogSalesMetadata from 'kinja-magma/models/BlogSalesMetadata';
import type LinkType from 'kinja-magma/models/Link';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type { AuthorUserPropertiesMap, AuthorUserProperties } from 'kinja-magma/models/UserProperty';
import type { CommerceModulePost } from 'kinja-components/components/sidebar/commerce/commerce-module-post';

const Container = styled.div`
	max-width: 800px;
	margin: 0 auto;
	padding: ${props => props.theme.columnPadding};
`;


const MetaContainer = styled.div`
	margin-bottom: 24px;
`;

const Article = styled.article`
	font-family: ${props => props.theme.typography.body.fontFamily};
	font-weight: 400;
	font-size: 15px;
	line-height: 28px;
	margin: 0 auto;

	amp-iframe,
	p {
		margin-bottom: 1.25rem;
	}

	ul {
		margin-bottom: 1.5rem;
	}

	> figure {
		margin-bottom: 1.25rem;
	}

	> figure amp-img,
	> figure amp-video,
	amp-carousel,
	.flex-video {
		display: block;
		margin-left: -${props => props.theme.columnPadding};
		margin-right: -${props => props.theme.columnPadding};
	}
`;

const AmpPermalink = ({
	authors,
	authorUserProperties,
	post,
	blog,
	features,
	insetPrefix,
	blogSales,
	relatedBlogs,
	relatedPosts,
	links,
	embeddedVideos,
	disableAds,
	commercePermalinkPosts
}: {
	authors: Array<User>,
	authorUserProperties: ?AuthorUserPropertiesMap,
	post: Post,
	blog: Blog,
	features: { [name: string]: boolean },
	insetPrefix: string,
	blogSales: ?BlogSalesMetadata,
	relatedBlogs?: Array<Blog>,
	relatedPosts?: Array<Post>,
	links: Array<LinkType>,
	embeddedVideos?: Array<VideoMeta>,
	disableAds: boolean,
	commercePermalinkPosts: Array<CommerceModulePost>
}) => {
	const {
		formattedHeadline: headline,
		permalink,
		facebookShareUrl,
		twitterShareUrl,
		featuredMedia
	} = post;
	const {
		timezone,
		canonicalHost,
		properties: { alternativeFiledToText, blogGroup, skimLinkId }
	} = blog;
	const postBody = post.body.map(node => parseNode(node));
	const firstNode = postBody[0];
	const firstNodeIsMedia: boolean = firstNode && (firstNode.type === 'Image' || isVideo(firstNode));
	const nodes = [
		...(featuredMedia ? [featuredMedia] : []),
		...postBody
	];
	const postHasCommerceDisclaimer = blog && blog.isCommerce && !post.sponsored;
	const commentEmbedURL = `${insetPrefix}/embed/comments/amp/${post.id}?blogId=${blog.id}`;

	const showTaboola = post.adZone !== 'collapse' && !features.no3rdparty && !features.no_ads && !features.only_left_top_ad &&
		Post.getType(post) !== 'FEATURED' && Post.getType(post) !== 'VIDEO';

	const BlockNodeListComponent = disableAds ? BlockNodeList : AmpBlockNodeListWithAds;

	const kinjaMeta: KinjaMeta = {
		...blogRelatedValues(blog),
		...postRelatedValues(post),
		...blogSales ? blogSalesRelatedValues(blogSales) : {},
		commercePermalinkPosts,
		config: {
			shouldAffiliatizeAmazonUris: true,
			attributionsEnabled: !blog.hideImageAttributions
		},
		features,
		links,
		postIsVideo: post.isVideo,
		postIsSlideshow: post.template === 'Slideshow',
		embeddedVideos,
		pageType: 'permalink',
		disableAds
	};

	const shouldShowRelatedStories = relatedPosts && relatedPosts.length > 0;
	const useSkimlinks = features.amp_skimlinks;
	const blogGroupSkimLinkId: ?string = skimLinkId || (blogGroup && config.blogGroupToSkimLinkId[blogGroup]);

	const shouldShowAuthorBio = post.showAuthorBio && authors.length > 0 && authorUserProperties &&
		// Flow types the return value of Object.values as Array<mixed>, making it impossible to unwrap
		// More info: https://github.com/facebook/flow/issues/2221
		// eslint-disable-next-line flowtype/no-weak-types
		((Object.values(authorUserProperties): any): Array<AuthorUserProperties>).some(properties => properties.showBio);

	return (
		<Theme blog={blog && blog.blogTheme}>
			<PlatformProvider value="amp">
				<Container>
					{postHasCommerceDisclaimer && <CommerceDisclaimer locale={blog.locale} />}
					<Article>
						{headline && <Headline
							headline={headline}
							permalink={permalink}
						/>}

						<MetaContainer>
							<PermalinkByline
								authors={authors}
								hideAuthorsOnBlog={shouldHideAuthorsBasedOnBlog(blog)}
								pageType='permalink'
								blogProperties={{ alternativeFiledToText, timezone}}
								post={post}
							/>
						</MetaContainer>

						<KinjaMetaProvider value={kinjaMeta}>
							<BlockNodeListComponent
								nodes={nodes}
								renderNode={ampRenderNode}
								adSettings={post.adSettings}
								shiftNodes={firstNodeIsMedia}
							/>
						</KinjaMetaProvider>

						{shouldShowAuthorBio && <AuthorBioWrapper
							withStandardGrid={Boolean(features && features.grid_standard)}
							wideRail={features && features.wide_rail}
						>
							<AuthorBio
								host={config.defaultHost}
								authors={authors}
								authorUserProperties={authorUserProperties}
							/>
						</AuthorBioWrapper>}

						{shouldShowRelatedStories && <PermalinkRelatedStories
							headline={post.relatedModule && post.relatedModule.headline}
							posts={relatedPosts}
							pageType={'permalink'}
							relatedBlogs={relatedBlogs || []}
							withStandardGrid={Boolean(features && features.grid_standard)}
							wideRail={Boolean(features && features.wide_rail)}
						/>}

						{useSkimlinks && blogGroupSkimLinkId && blogGroupSkimLinkId.length &&
							<AmpSkimlinks
								blogGroup={blog.properties.blogGroup}
								canonicalHost={canonicalHost}
								skimLinkId={blogGroupSkimLinkId}
							/>
						}

					</Article>
				</Container>

				{!blog.commentsDisabled &&
					<AmpComments
						commentEmbedURL={commentEmbedURL}
						permalink={post.permalink}
					/>
				}

				{showTaboola &&
					<Container>
						<AmpTaboola canonicalHost={canonicalHost}/>
					</Container>
				}

				<SharingFooter
					facebookShareUrl={facebookShareUrl}
					twitterShareUrl={twitterShareUrl}
				/>
			</PlatformProvider>
		</Theme>
	);
};

export default AmpPermalink;
