/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { createPostId } from 'kinja-magma/models/Id';
import Headline from '../post-elements/headline';
import { LeftOfHeadlineImage } from './figure/left-of-headline-image';
import MetaInfo, { MetaInfoWrapper } from '../post-elements/meta-info';
import Byline from '../post-elements/byline';
import Excerpt from '../post-elements/excerpt';
import media from 'kinja-components/style-utils/media';
import Link from '../elements/link';
import { Anchor } from '../elements/link';
import {
	PostToolsContainerDesktop,
	PostToolsContainerMobile
} from './post-tools-containers';
import {
	StreamPostClick,
	KinjaDealsClick,
	ExternalPostClick,
	StreamPostClickKala
} from '../stream/analytics';
import assignCommerceSource from 'kinja-components/utils/assignCommerceSource';

import type { StoryCardProps } from './';

const Article = styled.article`
	position: relative;
	display: flex;
	flex-direction: row;
	${media.smallOnly`
		flex-direction: column;
	`}
`;

export const MobileMetaInfo = styled.div`
	${MetaInfoWrapper}:not(:empty) {
		margin-bottom: 4px;
	}
	${media.mediumUp`
		display: none;
	`}
`;

const DesktopMetaInfo = styled.div`
	${media.smallOnly`
		display: none;
	`}
	${MetaInfoWrapper}:not(:empty) {
		margin: -1px 0 5px;
	}
`;

const HeadlineOrExcerpt = styled.div`
	${media.mediumUp`
		flex: 2.162;
	`}
`;

const RoundupExcerptContainer = styled.div`
	${media.mediumUp`
		margin-bottom: 10px;
	`}
`;

export const HeadlineContainer = styled.div`
	${Anchor} {
		color: ${props => props.theme.color.black};
	}
	${Anchor}:hover {
		color: ${props => props.theme.color.black};
	}
`;

export const BylineContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: -4px;

	${props => props.withExcerpt && css`
		margin-bottom: 6px;
	`}

	${media.smallOnly`
		margin-top: 10px;
	`}
`;

export default function StoryCardCompact({
	authors,
	blog,
	index,
	isLivePost,
	kinjaMeta,
	pageType,
	parentBlogName,
	post,
	excerpt,
	postToolsContents,
	repostBlog,
	isNativeAd,
	isExternalNativeAd,
	withBranding,
	withExcerpt
}: StoryCardProps) {
	const RenderMetaInfo = (
		<MetaInfo
			category={post.categoryData}
			subcategory={post.subcategoryData}
			storyType={post.storyType}
			blog={blog}
			repostBlog={repostBlog || blog}
			post={post}
			parentBlogName={parentBlogName}
			defaultBlogDisplayName={repostBlog && repostBlog.displayName}
			defaultBlogRecircGroup={repostBlog && repostBlog.properties && repostBlog.properties.recircGroup}
			defaultBlogGroup={repostBlog && repostBlog.blogGroup}
			isSponsored={post.sponsored}
			isEditorial={post.editorial}
			isNativeAd={isNativeAd}
			shouldShowStoryTypes={repostBlog ? repostBlog.blogGroup === (blog && blog.blogGroup) : true}
			hideSubCategory
			isLivePost={isLivePost}
			isExternalPost={Boolean(post.permalinkRedirect) || post.id === '0'}
			pageType={pageType}
			index={index}
			multiline
		/>
	);

	const commerceSource = assignCommerceSource(post, pageType);

	return (
		<Article className="js_post_item" data-id={post.id} data-index={index} data-commerce-source={commerceSource}>
			<MobileMetaInfo>{RenderMetaInfo}</MobileMetaInfo>
			{post.leftOfHeadline && (
				<LeftOfHeadlineImage
					blogGroup={blog && blog.blogGroup}
					image={post.leftOfHeadline}
					permalink={post.securePermalink}
					videoPost={post.isVideo}
					pageType={pageType}
					score={post.reviewScore}
					storyTypeItem
					storyTypeIndex={index}
					isDeals={post.isDeals}
					isExternalPost={Boolean(post.permalinkRedirect)}
					postId={post.id}
					isNativeAd={isNativeAd}
					withBranding={withBranding}
				/>
			)}
			<HeadlineOrExcerpt>
				<DesktopMetaInfo>{RenderMetaInfo}</DesktopMetaInfo>
				{post.headline && (
					<HeadlineContainer>
						<Link href={post.securePermalink}
							kalaEvent = {StreamPostClickKala(post.id, pageType)}
							events = {[
								StreamPostClick(index, post.securePermalink, pageType),
								(post.permalinkRedirect ? ExternalPostClick(index, post.securePermalink) : undefined),
								(post.isDeals ? KinjaDealsClick(index, post.securePermalink) : undefined)
							].filter(Boolean) }
						>
							<Headline isExternalNativeAd={isExternalNativeAd} level={2}>{post.formattedHeadline}</Headline>
						</Link>
					</HeadlineContainer>
				)}
				{!post.headline && excerpt && excerpt.length && (
					<RoundupExcerptContainer>
						<Excerpt postBody={excerpt} kinjaMeta={kinjaMeta}/>
					</RoundupExcerptContainer>
				)}
				<BylineContainer withExcerpt={withExcerpt}>
					{post.id !== createPostId(0) &&
						<Byline
							index={index}
							authors={authors}
							blog={blog}
							post={post}
							pageType={pageType}
							isScheduled={post.status === 'SCHEDULED'}
							repostBlog={repostBlog}
							noLink={isNativeAd}
						/>
					}
					{postToolsContents && <PostToolsContainerMobile>{postToolsContents}</PostToolsContainerMobile>}
				</BylineContainer>
				{post.headline && withExcerpt && excerpt && excerpt.length && (
					<Excerpt postBody={excerpt} kinjaMeta={kinjaMeta}/>
				)}
			</HeadlineOrExcerpt>
			{postToolsContents && <PostToolsContainerDesktop>{postToolsContents}</PostToolsContainerDesktop>}
		</Article>
	);
}
