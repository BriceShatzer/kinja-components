/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';
import {
	StreamPostClick,
	KinjaDealsClick,
	ExternalPostClick,
	StreamPostClickKala
} from 'kinja-components/components/stream/analytics';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import assignCommerceSource from 'kinja-components/utils/assignCommerceSource';
import Link, { Anchor } from 'kinja-components/components/elements/link';
import Headline from 'kinja-components/components/post-elements/headline';
import Excerpt from 'kinja-components/components/post-elements/excerpt';
import LivePostLabel from 'kinja-components/components/post-elements/live-post-label';
import LargeOnStreamCardImage from './large-on-stream-card-media';
import Breadcrumbs from './breadcrumbs';
import Meta, { StyledTime } from './meta';
import Byline, { bylineLineHeight } from './byline';
import MobileTools from './mobile-tools';
import type { StoryCardProps } from './';

const Article = styled.article`
	position: relative;
	display: flex;
	flex-direction: row;

	${media.mediumUp`
		min-height: 150px;
	`}

	${media.smallOnly`
		flex-direction: column;
	`}
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const MediaContainer = styled.div`
	margin-bottom: ${({ hasMedia }) => hasMedia && '16px'};
`;

const DesktopMetaInfo = styled.div`
	${({ hasBlogAvatar }) => hasBlogAvatar && css`
		line-height: 20px;
		height: 20px;
		margin-bottom: 8px;
	`}

	${media.mediumUp`
		${({ isV3 }) => !isV3 && css`
			margin-bottom: ${({ hasBlogAvatar }) => hasBlogAvatar ? '16px' : '12px'};
			margin-top: ${({ hasBlogAvatar }) => hasBlogAvatar ? '-1px' : '-4px'};
		`}
	`}

	${media.smallOnly`
		display: none;
	`}
`;

const StyledLivePostLabel = styled(LivePostLabel)`
	margin-right: 10px;
	line-height: 18px;

	${media.smallOnly`
		line-height: 12px;
	`}
`;

const MobileMetaInfo = styled.div`
	display: none;

	${media.smallOnly`
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		margin-bottom: 10px;
		height: 18px;

		${StyledLivePostLabel} {
			display: flex;
			flex-flow: row;
		}
	`}

	${media.mediumUp`
		display: ${props => !props.isV3 && 'none'};
	`}
`;

const ExcerptContainer = styled.div`
	${media.smallOnly`
		display: none;
	`}

	${media.mediumUp`
		margin-top: 8px;
	`}
`;

const HeadlineContainer = styled.div`
	${Anchor} {
		color: ${props => props.theme.color.black};
	}

	${Anchor}:hover {
		color: ${props => props.theme.color.black};
	}

	${Anchor} h1 {
		margin-top: -5px;
		margin-left: -1px;
	}
`;

const StyledHeadline = styled(Headline)`
	${media.smallOnly`
		font-size: ${props => props.isOnion ? '22px' : '24px'};
		line-height: ${props => props.isOnion ? '1.4' : '1.3'};
	`}
`;

const BylineWrapper = styled.div`
	line-height: ${bylineLineHeight};
	display: flex;
	justify-content: space-between;

	${media.smallOnly`
		margin-top: 8px;
	`}
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
	line-height: 20px;
	height: 20px;
	margin-bottom: 10px;

	${media.smallOnly`
		margin-bottom: 0;
	`}
`;

function Embiggened(props: StoryCardProps) {
	const {
		authors,
		blog,
		defaultBlog,
		isEmbiggened,
		isLivePost,
		isNativeAd,
		isSaved,
		isSplicedPost,
		isSponsoredPost,
		isV3,
		kinjaMeta,
		pageType,
		parentBlogName,
		post,
		repostBlog,
		index,
		withAuthorAvatar,
		AsideToolsComponent,
		excerpt,
		featuredVideo
	} = props;
	const isExternalPost = Boolean(post.permalinkRedirect) || post.id === '0';
	const commerceSource = assignCommerceSource(post, pageType);
	const hideAuthors = blog && blog.hideAuthorInfo;

	const defaultBlogDisplayName = repostBlog && repostBlog.displayName || '';
	const defaultBlogGroup = repostBlog && repostBlog.blogGroup || '';
	const defaultBlogHost = repostBlog && repostBlog.canonicalHost || '#';
	const defaultBlogRecircGroup = repostBlog && repostBlog.properties && repostBlog.properties.recircGroup;

	const isRepostBlogSameAsCurrentBlog = ((blog && blog.blogGroup) === defaultBlogGroup && !isExternalPost) || !repostBlog;

	const hasMedia = post && (
		post.frontpageVideo
		|| post.aboveHeadline
		|| post.leftOfHeadline
	);
	const hasMeta = isSponsoredPost || isSplicedPost || Boolean(post.storyType) || Boolean(post.categoryData);
	const hasBylineOrComments = !hideAuthors || !(blog && blog.commentsDisabled);
	const hasBlogAvatar = defaultBlogGroup !== 'default'
		&& !isRepostBlogSameAsCurrentBlog
		&& isSplicedPost
		&& defaultBlogGroup;
	const shouldShowStoryTypes = isRepostBlogSameAsCurrentBlog;
	const shouldShowBreadcrumbs = isV3 && hasMeta;
	const hideRecommendations = blog && blog.hideRecommendations;

	return (
		<EnsureDefaultTheme>
			<Article className="js_post_item" data-id={post.id} data-index={index} data-commerce-source={commerceSource}>
				{AsideToolsComponent && (
					<AsideToolsComponent
						blog={blog}
						defaultBlog={defaultBlog}
						defaultBlogGroup={defaultBlogGroup}
						defaultBlogRecircGroup={defaultBlogRecircGroup}
						isCommerce={repostBlog && repostBlog.isCommerce}
						isEditorial={post.editorial}
						isEmbiggened={isEmbiggened}
						isExternal={isExternalPost}
						isLive={isLivePost}
						isSaved={isSaved}
						isSponsored={post.sponsored}
						post={post}
						authors={authors}
					/>
				)}
				<Container>
					<MobileMetaInfo isV3={isV3} hasBlogAvatar={hasBlogAvatar}>
						{(hasMeta || isNativeAd) ? (
							<React.Fragment>
								{isLivePost && !isV3 && (
									<StyledLivePostLabel
										locale={blog && blog.locale}
									/>
								)}
								<Meta
									{...props}
									category={post.categoryData}
									defaultBlogDisplayName={defaultBlogDisplayName}
									defaultBlogGroup={defaultBlogGroup}
									defaultBlogHost={defaultBlogHost}
									defaultBlogRecircGroup={defaultBlogRecircGroup}
									isEditorial={post.editorial}
									isExternalPost={isExternalPost}
									isSponsored={post.sponsored}
									isV3={isV3}
									parentBlogName={parentBlogName}
									shouldShowStoryTypes={shouldShowStoryTypes}
									storyType={post.storyType}
								/>
								{!hasBylineOrComments && (
									<MobileTools
										postId={post.id}
										saveCount={post.likes ? Number(post.likes) : 0}
										isSaved={isSaved}
									/>
								)}
							</React.Fragment>
						) : (
							<StyledTime
								relativeShort
								permalink={post.securePermalink}
								millis={post.repost ? post.repost.repostTimeMillis : post.publishTimeMillis}
								timezone={blog && blog.timezone}
								locale={blog && blog.locale}
								isScheduled={post && post.status === 'SCHEDULED'}
								index={index}
								pageType={pageType}
								postId={post.id}
								hideRecommendations={hideRecommendations}
							/>
						)}
					</MobileMetaInfo>
					{hasMeta && isV3 && (
						<DesktopMetaInfo hasMeta={hasMeta} isV3={isV3} hasBlogAvatar={hasBlogAvatar}>
							<Meta
								{...props}
								category={post.categoryData}
								defaultBlogDisplayName={defaultBlogDisplayName}
								defaultBlogGroup={defaultBlogGroup}
								defaultBlogHost={defaultBlogHost}
								defaultBlogRecircGroup={defaultBlogRecircGroup}
								isEditorial={post.editorial}
								isExternalPost={isExternalPost}
								isSponsored={post.sponsored}
								isV3={isV3}
								parentBlogName={parentBlogName}
								shouldShowStoryTypes={shouldShowStoryTypes}
								storyType={post.storyType}
							/>
						</DesktopMetaInfo>
					)}
					<MediaContainer hasMedia={hasMedia}>
						<LargeOnStreamCardImage
							post={post}
							blog={blog}
							pageType={pageType}
							index={index}
							videoMeta={featuredVideo}
						/>
					</MediaContainer>
					{hasMeta && !isV3 ? (
						<DesktopMetaInfo hasMeta={hasMeta} isV3={isV3} hasBlogAvatar={hasBlogAvatar}>
							<Meta
								{...props}
								category={post.categoryData}
								defaultBlogDisplayName={defaultBlogDisplayName}
								defaultBlogGroup={defaultBlogGroup}
								defaultBlogHost={defaultBlogHost}
								defaultBlogRecircGroup={defaultBlogRecircGroup}
								isEditorial={post.editorial}
								isExternalPost={isExternalPost}
								isSponsored={post.sponsored}
								isV3={isV3}
								parentBlogName={parentBlogName}
								shouldShowStoryTypes={shouldShowStoryTypes}
								storyType={post.storyType}
							/>
						</DesktopMetaInfo>
					) : (
						shouldShowBreadcrumbs && (
							<StyledBreadcrumbs
								{...props}
								category={post.categoryData}
								hasBlogAvatar={hasBlogAvatar}
								index={index}
								isExternalPost={isExternalPost}
								isRepostBlogSameAsCurrentBlog={isRepostBlogSameAsCurrentBlog}
								isVertical={Boolean(repostBlog && repostBlog.parentId)}
								pageType={pageType}
								post={post}
								storyType={post.storyType}
								verticalCanonicalHost={defaultBlogHost}
								verticalDisplayName={defaultBlogDisplayName}
								withoutTheme={!isRepostBlogSameAsCurrentBlog}
							/>
						)
					)}
					{post.headline && (
						<HeadlineContainer>
							<Link
								href={post.securePermalink}
								kalaEvent = {StreamPostClickKala(post.id, pageType)}
								events = {[
									StreamPostClick(index, post.securePermalink, pageType),
									(post.permalinkRedirect ? ExternalPostClick(index, post.securePermalink) : undefined),
									(post.isDeals ? KinjaDealsClick(index, post.securePermalink) : undefined)
								].filter(Boolean)}
							>
								<StyledHeadline
									isOnion={blog && blog.blogGroup === 'theonion'}
									embiggened
									level="2"
								>
									{post.formattedHeadline}
								</StyledHeadline>
							</Link>
						</HeadlineContainer>
					)}
					{hasBylineOrComments && (
						<BylineWrapper>
							<Byline
								authors={authors}
								blog={blog}
								hideAuthors={hideAuthors}
								index={index}
								isExternalPost={isExternalPost}
								isSplicedPost={isSplicedPost}
								pageType={pageType}
								post={post}
								repostBlog={repostBlog}
								withAuthorAvatar={withAuthorAvatar}
							/>
							{hasBylineOrComments && (
								<MobileTools
									postId={post.id}
									saveCount={post.likes ? Number(post.likes) : 0}
									isSaved={isSaved}
									hideRecommendations={hideRecommendations}
								/>
							)}
						</BylineWrapper>
					)}
					{excerpt && excerpt.length > 0 && (
						<ExcerptContainer>
							<Excerpt
								kinjaMeta={kinjaMeta}
								postBody={excerpt}
							/>
						</ExcerptContainer>
					)}
				</Container>
			</Article>
		</EnsureDefaultTheme>
	);
}

export default Embiggened;
