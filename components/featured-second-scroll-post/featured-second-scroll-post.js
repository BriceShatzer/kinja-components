// @flow

import * as React from 'react';
import styled from 'styled-components';

import CommerceDisclaimer from '../post-elements/commerce-disclaimer';
import media from 'kinja-components/style-utils/media';
import Button from '../buttons';
import ArrowRight from '../icon19/ArrowRight';
import Link from '../elements/link';
import {
	PermalinkHeaderClick,
	PermalinkPreviewCTAClick
} from '../permalink/analytics';
import PermalinkByline from '../post-elements/permalink-byline';
import { shouldHideAuthorsBasedOnBlog } from 'kinja-components/components/post-elements/byline/byline';
import { AuthorContainer } from '../post-elements/permalink-byline/permalink-byline';
import { LazyResponsiveImage } from '../elements/image';
import FeaturedPermalinkStoryType from '../featured-permalink-storytype';
import trimExcerpt from 'postbody/utils/trimExcerpt';
import Excerpt from 'kinja-components/components/post-elements/excerpt';
import { parseNode } from 'postbody/BlockNode';
import SponsoredLabel from 'kinja-components/components/post-elements/sponsored-label';
import Theme from 'kinja-components/components/theme';
import MetaToolbar from '../meta-toolbar';
import Post from 'kinja-magma/models/Post';

import type Blog from 'kinja-magma/models/Blog';
import type { PageType } from 'kinja-magma/models/PageType';
import type User from 'kinja-magma/models/User';

import { VideoPlayer } from 'kinja-components/components/video-player';
import type { VideoPlayerProps } from 'kinja-components/components/video-player/video-player';

type Props = {
	post: Post,
	blog: Blog,
	pageType: PageType,
	authors: Array<User>,
	useVideoJs?: boolean,
	videoJSPlayerProps?: ?VideoPlayerProps
};

const PostContainer = styled.div`
	margin: 0 -1.125rem;

	${media.mediumUp`
		margin: 0;
	`}
`;

const PostInner = styled.div`
	background: ${props => props.theme.color.black};
	padding: 16px;

	${media.mediumUp`
		padding: 24px;
	`}

	${AuthorContainer} {
		a,
		a:hover {
			color: ${props => props.theme.color.white};
		}
	}
`;

const Headline = styled.h2`
	font-size: ${props => props.theme.typography.permalinkHeadlineSize.mediumUp};
	font-family: ${props => props.theme.typography.headline.fontFamily};
	line-height: ${props => props.theme.typography.permalinkHeadlineLineHeight};
	margin: 1.6rem 0;
	text-align: center;

	a,
	a:hover {
		color: ${props => props.theme.color.white};
	}
`;

const FeaturedMediaContainer = styled.div`
	height: 0;
	overflow: hidden;
	padding-bottom: 56.25%;
	position: relative;
	width: 100%;
`;

const FeaturedVideoContainer = styled.div`
	position: relative;
	width: 100%;
`;

const ExcerptContainer = styled.div`
	color: ${props => props.theme.color.white};
	margin: 20px auto;
	line-height: 28px;
	font-family: ${props => props.theme.typography.body.fontFamily};

	a {
		color: ${props => props.theme.color.white};
	}
`;

const StoryTypeWrapper = styled.div`
	margin-top: 26px;
	display: flex;
	justify-content: center;
`;

const UnderHeadline = styled.div`
	border-bottom: 1px solid ${props => props.theme.color.darkgray};
	padding-bottom: 20px;
	color: ${props => props.theme.color.white};
	display: flex;
	flex-wrap: wrap;
`;

const PermalinkBylineContainer = styled.div`
	flex-grow: 1;
	flex-shrink: 0;
`;

const VideoPlayerIframe = styled.iframe`
	width: 100%;
	height: 100%;
	position: absolute;
`;

const FeaturedSecondScrollPost = (props: Props) => {
	const { post, blog, pageType, authors, useVideoJs, videoJSPlayerProps } = props;
	const { featuredMedia, storyType, categoryData, subcategoryData,
		permalinkHost, sponsored } = post;
	const { hideViewcounts, hideRecommendations, timezone,
		properties: { alternativeFiledToText }, isSatire } = blog;
	const viewCount = Number(post.viewCount) || 0;
	const uniqueViewCount = Number(post.uniqueViewCount) || 0;
	const replyCount = Number(post.replyCount) || 0;
	const likes = Number(post.likes) || 0;

	const featuredVideoUrl = !useVideoJs ? Post.featuredVideoUrl(featuredMedia, true) : undefined;

	return (
		<PostContainer>
			{blog && blog.isCommerce && !post.sponsored && <CommerceDisclaimer locale={blog.locale}/>}
			{sponsored && <SponsoredLabel
				isEditorial={post.editorial}
				isBranded={isSatire}
				locale={blog && blog.locale}
			/>}
			<PostInner>
				{featuredMedia && featuredMedia.type === 'Image' && <FeaturedMediaContainer>
					<Link href={post.permalink} events={[PermalinkHeaderClick(post.permalink, true)]}>
						<LazyResponsiveImage id={featuredMedia.id}/>
					</Link>
				</FeaturedMediaContainer>}
				{useVideoJs && <FeaturedVideoContainer>
					<VideoPlayer {...videoJSPlayerProps} />
				</FeaturedVideoContainer>}
				{featuredVideoUrl && <FeaturedMediaContainer>
					<VideoPlayerIframe src={featuredVideoUrl}/>
				</FeaturedMediaContainer>}
				{storyType && <StoryTypeWrapper>
					<FeaturedPermalinkStoryType
						permalinkHost={permalinkHost}
						subcategoryData={subcategoryData}
						categoryData={categoryData}
						storyType={storyType}
					/>
				</StoryTypeWrapper>}
				<Headline>
					<Link
						href={post.permalink} events={[PermalinkHeaderClick(post.permalink, true)]}
						dangerouslySetInnerHTML={{__html: post.formattedHeadline}}
					/>
				</Headline>
				<UnderHeadline>
					<PermalinkBylineContainer>
						<PermalinkByline
							hideAuthorsOnBlog={shouldHideAuthorsBasedOnBlog(blog)}
							authors={authors}
							post={post}
							blogProperties={{ alternativeFiledToText, timezone}}
							pageType={pageType}
							showTags={false}
						/>
					</PermalinkBylineContainer>

					<MetaToolbar
						hideRecommendations={hideRecommendations}
						hideViewcounts={hideViewcounts}
						viewCount={viewCount}
						uniqueViewCount={uniqueViewCount}
						replyCount={replyCount}
						postId={post.id}
						permalink={post.permalink}
						likeCount={likes}
						isSecondScroll
					/>

				</UnderHeadline>
				{post.firstParagraph && <ExcerptContainer>
					<Excerpt
						postBody={trimExcerpt([parseNode(post.firstParagraph)], 320)}
					/>
				</ExcerptContainer>}
			</PostInner>
			<Link
				href={post.permalink}
				events={[PermalinkPreviewCTAClick(post.permalink)]}
			>
				<Theme blog={blog.blogTheme}>
					<Button
						label='See more'
						icon={<ArrowRight/>}
						fullwidth
					/>
				</Theme>
			</Link>
		</PostContainer>
	);
};

export default FeaturedSecondScrollPost;
