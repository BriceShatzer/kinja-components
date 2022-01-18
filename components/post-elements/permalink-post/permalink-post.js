/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import BlockNodeList from '../../postbody/block-node-list';
import { BlockNodeListWithAds } from '../../postbody/block-node-list/block-node-list';
import webRenderNode from '../../postbody/block-node-list/web-render-node';
import { isBasicVideo } from '../../postbody/block-node-list/web-render-node';
import {
	BulletedList,
	NumberedList
} from '../../postbody/block-node-list/renderContainer';
import { KinjaMetaProvider } from '../../hoc/context';
import { blogRelatedValues, blogSalesRelatedValues, postRelatedValues } from 'kinja-components/components/hoc/context';
import type { KinjaMeta } from '../../hoc/context';
import StoryTypeBoilerplate from '../../content-summary';
import { EmbedWrapper } from '../../postbody/embed-frame/embedFrame';
import BlockQuote from '../../postbody/blockquote';
import { ImageNodeWrapper } from '../../postbody/image-node/image-node';
import { HeadingWrapper } from '../../postbody/heading/heading';
import { SummaryBox } from '../../content-summary/content-summary';
import { PermalinkHeaderClick } from '../../permalink/analytics';
import Link from '../../elements/link';
import { KinjaVideoContainer } from '../../postbody/kinja-video/kinja-video';

import type SpecialSection from 'kinja-magma/models/SpecialSection';
import type LinkType from 'kinja-magma/models/Link';
import type { PostNeighbors } from 'kinja-magma/models/Post';
import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type StoryType from 'kinja-magma/models/StoryType';
import type { BlockNode } from 'postbody/BlockNode';
import type BlogSalesMetadata from 'kinja-magma/models/BlogSalesMetadata';
import type { CommerceModulePost } from 'kinja-components/components/sidebar/commerce/commerce-module-post';

type PermalinkPostProps = {
	canonicalHost?: string,
	links: Array<LinkType>,
	embeddedVideos: Array<VideoMeta>,
	postBody: Array<BlockNode>,
	postNeighbors?: PostNeighbors,
	storyType?: ?StoryType,
	specialSectionBlog?: ?Blog,
	specialSectionData?: ?SpecialSection,
	adsEnabled?: boolean,
	features?: { [name: string]: boolean },
	post: Post,
	blog: Blog,
	blogSales: ?BlogSalesMetadata,
	isSecondScroll?: boolean,
	commercePermalinkPosts?: ?Array<CommerceModulePost>
};

export const ParagraphStyle = css`
	font-family: ${props => props.theme.typography.body.fontFamily};
	font-size: 15px;
	line-height: 28px;
	font-weight: normal;

	${media.mediumUp`
		font-size: 16px;
		line-height: 29px;
	`}
`;

export const PermalinkPostWrapper = styled.div`
	max-width: ${props => props.withStandardGrid ? '100%' : props.theme.featuredContentWidth};

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('8c') : props.theme.featuredContentWidth};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('8c') : props.theme.featuredContentWidth};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('8c') : props.theme.featuredContentWidth};
		`}
		${media.xxxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxxlarge('8c') : props.theme.featuredContentWidth};
		`}
	` : css`
		${media.xxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('8c') : props.theme.featuredContentWidth};
		`}
	`}

	width: 100%;
	${BulletedList},
	${NumberedList},
	${BlockQuote},
	${SummaryBox},
	${EmbedWrapper},
	${KinjaVideoContainer},
	p,
	ul,
	hr,
	${HeadingWrapper},
	> span,
	figure,
	pre {
		&:not(${ImageNodeWrapper}) {
			margin-left: auto;
			margin-right: auto;
			max-width: ${props => props.withStandardGrid ? '100%' : props.theme.postContentMaxWidth};

			${media.largeOnly`
				max-width: ${props => props.withStandardGrid ? gridValue.large('6c') : props.theme.postContentMaxWidth};
			`}

			${media.xlargeOnly`
				max-width: ${props => props.withStandardGrid ? gridValue.xlarge('6c') : props.theme.postContentMaxWidth};
			`}

			${props => props.wideRail ? css`
				${media.xxlargeOnly`
					max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
				`}
				${media.xxxlargeUp`
					max-width: ${props => props.withStandardGrid ? gridValue.xxxlarge('6c') : props.theme.postContentMaxWidth};
					font-size: 1.125rem;
					line-height: 2rem;
				`}
			` : css`
				${media.xxlargeUp`
					max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
				`}
			`}
		}
	}

	figure {
		figcaption {
			${media.largeDown`
					padding-left: 20px;
			`}
		}
	}

	${BulletedList},
	${NumberedList},
	${BlockQuote},
	ul,
	p {
		${ParagraphStyle}
	}

	p {
		margin-bottom: 1.25rem;
	}

	${BulletedList},
	${NumberedList} {
		margin-bottom: 1.5rem;
	}

	iframe {
		max-width: 100%;
	}

	.twitter-embed iframe {
		margin: 0 auto;
	}

	.has-image,
	.has-embed,
	.has-video {
		margin-bottom: 0;
		width: 100%;
		clear: left;
	}

	${EmbedWrapper} {
		margin-bottom: 1.5rem;
	}

	.has-image.has-image,
	.has-video.has-video {
		margin-top: 0;
		margin-bottom: 1.5rem;
		position: relative;

		&.media-large {
			max-width: 800px;
		}

		&.media-large,
		&.media-medium,
		&.media-small {
			width: auto;
			text-align: center;
		}

		${media.mediumUp`
			&.media-small {
				max-width: ($main-content-max-width / 2);
				float: left;
				margin: 0.5rem ${p => p.theme.columnPadding} 0.5rem 0;
			}
		`}

		${media.mediumDown`
			&.media-medium,
			&.media-large {
				width: auto;
				margin-left: -${p => p.theme.columnPadding};
				margin-right: -${p => p.theme.columnPadding};

				figcaption,
				.video-embed__caption {
					padding: 0 ${p => p.theme.columnPadding};
				}
			}
		`}
	}

	pre {
		box-shadow: inset 0 0 5px 0 rgba(0, 0, 0, 0.5);
		display: block;
		overflow: auto;
		padding: ${p => p.theme.columnPadding};
		margin-bottom: 1.5rem;
		width: auto;
		word-break: break-all;

		> code {
			background-color: transparent;
		}

		p {
			line-height: 24px;
		}
	}

	pre,
	pre p,
	code {
		font-family: Courier, monospace;
		color: ${p => p.theme.color.darksmoke};
		font-size: 1rem;
	}

	pre,
	code {
		background-color: ${p => p.theme.color.whitesmoke};
	}

	code {
		padding: 0 7px;
		display: inline-block;
	}

	ul {
		margin-bottom: 1.5rem;
		li {
			margin-bottom: 6px;
		}
	}

	ul.commerce li {
		font-family: ${props => props.theme.typography.tertiary.fontFamily};
		padding-left: 0;
		color: ${props => props.theme.color.darkgray};

		em {
			color: ${props => props.theme.color.commerce};
			font-style: normal;
		}

		a {
			color: inherit;
			text-decoration: none;
			box-shadow: none;

			&:hover strong {
				text-decoration: underline;
			}
		}

		&::before {
			display: none;
		}
	}

	${HeadingWrapper}.commerce-icon {
		max-width: 100%;
	}

	.ad-container {
		margin: 0;
		width: auto;
		height: auto;

		&[data-ad-load-state=loaded] div iframe {
			margin: 0 auto;
		}
	}
`;

const PermalinkPost = ({
	canonicalHost,
	blog,
	blogSales,
	commercePermalinkPosts,
	post,
	postBody,
	postNeighbors,
	storyType,
	specialSectionBlog,
	specialSectionData,
	adsEnabled,
	features,
	links,
	embeddedVideos,
	isSecondScroll = false
}: PermalinkPostProps) => {
	const BlockNodeListComponent = adsEnabled ? BlockNodeListWithAds : BlockNodeList;
	// NOTE: we're adding empty strings to replace missing values, to avoid flow errors in existing code.
	// This is not ideal, values should ne either present AND valid, or not present at all,
	// and code that relies on them should do runtime checks instead of ingesting any present
	// value (that could be an empty string).
	// Do try to address this issue when revisiting this code.

	const kinjaMeta: KinjaMeta = {
		...blogRelatedValues(blog),
		...postRelatedValues(post),
		...blogSales ? blogSalesRelatedValues(blogSales) : {},
		config: {
			shouldAffiliatizeAmazonUris: true,
			attributionsEnabled: !blog.hideImageAttributions
		},
		features,
		links,
		embeddedVideos,
		commercePermalinkPosts,
		postIsVideo: post.isVideo,
		isSecondScroll
	};

	const firstNode = postBody[0];
	let firstMediaNode;
	const usedPostBody = [...postBody];
	const firstNodeIsMedia = firstNode && (firstNode.type === 'Image' || isBasicVideo(firstNode));
	if (firstNodeIsMedia) {
		firstMediaNode = usedPostBody.shift();
	}

	return (
		<KinjaMetaProvider value={kinjaMeta}>
			<PermalinkPostWrapper
				className="js_post-content"
				withStandardGrid={features && features.grid_standard}
				wideRail={features && features.wide_rail}
			>
				{isSecondScroll && firstMediaNode && <Link
					href={post.permalink} events={[PermalinkHeaderClick(post.permalink, true)]}>
					<BlockNodeList nodes={[firstMediaNode]} renderNode={webRenderNode} />
				</Link>}
				{!isSecondScroll && firstMediaNode &&
					<BlockNodeList nodes={[firstMediaNode]} renderNode={webRenderNode} />}
				{storyType && !specialSectionBlog && !isSecondScroll && <StoryTypeBoilerplate
					prevPermalink={postNeighbors && postNeighbors.previousPermalink}
					nextPermalink={postNeighbors && postNeighbors.nextPermalink}
					analyticsEventContext="Boilerplate - Story Type"
					canonical={storyType.canonical}
					canonicalHost={canonicalHost}
					category={post.categoryData}
					subcategory={post.subcategoryData}
					contentType={storyType.content}
					image={storyType && storyType.image}
					ga={() => {}}
					labelClassName="textbox-shadow"
					summary={storyType.boilerplate}
					title={storyType.title}
				/>}
				{specialSectionBlog && specialSectionData && !isSecondScroll && <StoryTypeBoilerplate
					analyticsEventContext='Boilerplate - Special Section'
					canonicalHost={specialSectionBlog.canonicalHost}
					contentType='Standard'
					summary={specialSectionBlog.description}
					image={specialSectionData.socialMediaImage}
					title={specialSectionBlog.displayName}
					labelClassName='textbox-shadow'
					hideNavigation
					ga={() => {}}
				/>}
				<BlockNodeListComponent
					nodes={usedPostBody}
					renderNode={webRenderNode}
					shiftNodes={firstNodeIsMedia}
					adSettings={
						adsEnabled
							? post.adSettings
							: null
					}
				/>
			</PermalinkPostWrapper>
		</KinjaMetaProvider>
	);
};

export default PermalinkPost;
