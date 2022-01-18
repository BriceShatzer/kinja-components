/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import media from 'kinja-components/style-utils/media';
import { parseNode } from 'postbody/BlockNode';
import trimExcerpt from 'postbody/utils/trimExcerpt';
import truncateHtml from 'html-truncate';
import {
	StreamPostClick,
	KinjaDealsClick,
	ExternalPostClick,
	StreamPostClickKala
} from 'kinja-components/components/stream/analytics';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { isCommerceUrl } from 'kinja-components/utils/checkForCommerceUrl';
import { isStudioAtGizmodo, isOnionLabs } from 'kinja-components/utils/blog';
import assignCommerceSource from 'kinja-components/utils/assignCommerceSource';
import Link, { Anchor } from 'kinja-components/components/elements/link';
import Headline from 'kinja-components/components/post-elements/headline';
import Excerpt from 'kinja-components/components/post-elements/excerpt';
import LivePostLabel from 'kinja-components/components/post-elements/live-post-label';
import { LeftOfHeadlineImage } from './figure/left-of-headline-image';
import Breadcrumbs from './breadcrumbs';
import Meta, { StyledTime } from './meta';
import Byline, { bylineLineHeight } from './byline';
import MobileTools from './mobile-tools';
import type { StoryCardProps } from './';

const Article = styled.article`
	position: relative;
	display: flex;
	flex-direction: column;

	${media.mediumUp`
		min-height: 150px;
	`}
`;

const MediaContainer = styled(LeftOfHeadlineImage)`
	&::before {
		display: none;
	}

	> a {
		border: none;
	}

	${media.smallOnly`
		margin-bottom: 16px;
	`}

	${props => props.oneRowOnMobile && css`
		${media.smallOnly`
			margin-bottom: 0;
			flex-basis: 30%;
			flex-shrink: 0;
			margin-right: 10px;
		`}
	`}
`;

const StyledLivePostLabel = styled(LivePostLabel)`
	margin-right: 10px;
	line-height: 12px;
`;

const MobileMetaInfo = styled.div`
	${media.smallOnly`
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		margin-bottom: 8px;
		height: 18px;

		${StyledLivePostLabel} {
			display: flex;
			flex-flow: row;
		}
	`}

	${media.mediumUp`
		display: none;
	`}
`;

const HeadlineOrExcerpt = styled.div`
	flex: 1;

	${media.mediumUp`
		flex: 2.162;
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

	${props => props.oneRowOnMobile && css`
		${media.smallOnly`
			font-size: 18px;
		`}
	`}
`;

const StyledExcerpt = styled(Excerpt)`
	margin-top: ${props => props.hasHeadline && '12px'};
	margin-bottom: ${props => !props.hasHeadline && '12px'};

	/* chop of top part of the text height to line up with images */
	&::before {
		content: '';
		display: block;
		height: 0;
		width: 0;
		margin-top: -6px;
	}
`;

const BylineWrapper = styled.div`
	line-height: ${bylineLineHeight};
	display: flex;
	justify-content: space-between;
	margin-top: -2px;

	${media.smallOnly`
		margin-top: 8px;
	`}
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

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
`;

const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	${media.mediumUp`
		flex-direction: row;
	`}

	${props => props.oneRowOnMobile && css`
		${media.smallOnly`
			flex-direction: row;
		`}
	`}
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
	line-height: 20px;
	height: 20px;
	margin-bottom: 8px;

	${media.smallOnly`
		margin-bottom: 5px;
	`}
`;

function Compact(props: StoryCardProps) {
	const {
		authors,
		blog,
		defaultBlog,
		isEmbiggened,
		isExternalNativeAd,
		isNativeAd,
		isLivePost,
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
		oneRowOnMobile,
		excerpt
	} = props;

	const commerceSource = assignCommerceSource(post, pageType);

	const isExternalPost = Boolean(post.permalinkRedirect) || post.id === '0';
	const hideAuthors = blog && blog.hideAuthorInfo;

	const defaultBlogDisplayName = repostBlog && repostBlog.displayName || '';
	const defaultBlogGroup = repostBlog && repostBlog.blogGroup || '';
	const defaultBlogHost = repostBlog && repostBlog.canonicalHost || '#';
	const defaultBlogName = repostBlog && repostBlog.name || '';
	const defaultBlogRecircGroup = repostBlog && repostBlog.properties && repostBlog.properties.recircGroup;

	const isRepostBlogSameAsCurrentBlog = ((blog && blog.blogGroup) === defaultBlogGroup && !isExternalPost) || !repostBlog;

	const hasMeta = isSponsoredPost || isSplicedPost || Boolean(post.storyType) || Boolean(post.categoryData);
	const hasBylineOrComments = !hideAuthors || !(blog && blog.commentsDisabled);
	const hasBlogAvatar =
		(defaultBlogGroup !== 'default' || isNativeAd) &&
		(isSplicedPost || isNativeAd || isExternalNativeAd) &&
		!isRepostBlogSameAsCurrentBlog &&
		!isStudioAtGizmodo(post.defaultBlogId) &&
		!isOnionLabs(post.defaultBlogId) && defaultBlogGroup;

	const shouldShowStoryTypes = isRepostBlogSameAsCurrentBlog;
	const shouldShowBreadcrumbs = isV3 && hasMeta;

	const firstParagraph = post.firstParagraph;
	const nativeExcerpt = post.nativeExcerpt;
	const hideRecommendations = blog && blog.hideRecommendations;
	const isCommerce = isCommerceUrl(post.permalink);
	const isNativeCommerce =
		isNativeAd &&
		repostBlog &&
		repostBlog.properties &&
		(repostBlog.properties.recircGroup === 'partnerEditorial' || repostBlog.properties.recircGroup === 'fmgBusiness');

	return (
		<EnsureDefaultTheme>
			<Article isV3={isV3} className="js_post_item" data-id={post.id} data-index={index} data-commerce-source={commerceSource}>
				{hasMeta && isV3 && (
					<Container>
						<DesktopMetaInfo hasMeta={hasMeta} isV3={isV3} hasBlogAvatar={hasBlogAvatar}>
							<Meta
								{...props}
								category={post.categoryData}
								defaultBlogDisplayName={defaultBlogDisplayName}
								defaultBlogGroup={defaultBlogGroup}
								defaultBlogHost={defaultBlogHost}
								defaultBlogRecircGroup={defaultBlogRecircGroup}
								isEditorial={post.editorial}
								isExternalNativeAd={isExternalNativeAd}
								isExternalPost={isExternalPost}
								isNativeAd={isNativeAd}
								isSponsored={post.sponsored}
								isV3={isV3}
								parentBlogName={parentBlogName}
								shouldShowStoryTypes={shouldShowStoryTypes}
								storyType={post.storyType}
							/>
						</DesktopMetaInfo>
					</Container>
				)}
				{AsideToolsComponent && (
					<AsideToolsComponent
						blog={blog}
						post={post}
						defaultBlog={defaultBlog}
						defaultBlogName={defaultBlogName}
						defaultBlogGroup={defaultBlogGroup}
						defaultBlogRecircGroup={defaultBlogRecircGroup}
						isCommerce={repostBlog && repostBlog.isCommerce}
						isEditorial={post.editorial}
						isEmbiggened={isEmbiggened}
						isExternalNativeAd={isExternalNativeAd}
						isExternal={isExternalPost}
						isLive={isLivePost}
						isNativeAd={isNativeAd}
						isSaved={isSaved}
						isSponsored={post.sponsored}
						pageType={pageType}
						authors={authors}
					/>
				)}
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
								isExternalNativeAd={isExternalNativeAd}
								isExternalPost={isExternalPost}
								isNativeAd={isNativeAd}
								isSponsored={post.sponsored}
								isV3={isV3}
								parentBlogName={parentBlogName}
								shouldShowStoryTypes={shouldShowStoryTypes}
								storyType={post.storyType}
							/>
							{!hasBylineOrComments && !isNativeAd && (
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
				<ContentContainer oneRowOnMobile={oneRowOnMobile}>
					{post.leftOfHeadline && (
						<MediaContainer
							image={post.leftOfHeadline}
							isNativeAd={isNativeAd}
							isExternalPost={isExternalPost}
							pageType={pageType}
							permalink={post.securePermalink}
							postId={post.id}
							score={post.reviewScore}
							storyTypeIndex={index}
							storyTypeItem
							videoPost={post.isVideo}
							oneRowOnMobile={oneRowOnMobile}
						/>
					)}
					<HeadlineOrExcerpt>
						{(hasMeta && !isV3) || isNativeAd ? (
							<DesktopMetaInfo isNative={isNativeAd} hasMeta={hasMeta} isV3={isV3} hasBlogAvatar={hasBlogAvatar}>
								<Meta
									{...props}
									category={post.categoryData}
									defaultBlogDisplayName={defaultBlogDisplayName}
									defaultBlogGroup={defaultBlogGroup}
									defaultBlogHost={defaultBlogHost}
									defaultBlogRecircGroup={defaultBlogRecircGroup}
									isEditorial={post.editorial}
									isExternalNativeAd={isExternalNativeAd}
									isExternalPost={isExternalPost}
									isNativeAd={isNativeAd}
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
						{post.headline ? (
							<HeadlineContainer>
								<Link
									href={post.securePermalink || post.permalink}
									kalaEvent={StreamPostClickKala(post.id, pageType)}
									events={[
										StreamPostClick(index, post.securePermalink, pageType),
										(post.permalinkRedirect ? ExternalPostClick(index, post.securePermalink) : undefined),
										(post.isDeals ? KinjaDealsClick(index, post.securePermalink) : undefined)
									].filter(Boolean)}
								>
									<StyledHeadline
										isOnion={blog && blog.blogGroup === 'theonion'}
										isExternalNativeAd={isExternalNativeAd}
										oneRowOnMobile={oneRowOnMobile}
										level="2"
									>
										{post.formattedHeadline}
									</StyledHeadline>
								</Link>
							</HeadlineContainer>
						) : (
							excerpt && excerpt.length > 0 && (
								<StyledExcerpt
									kinjaMeta={kinjaMeta}
									hasHeadline={post.headline && post.formattedHeadline.length > 0}
									postBody={excerpt}
								/>
							)
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
								{hasBylineOrComments && !isNativeAd && (
									<MobileTools
										postId={post.id}
										saveCount={post.likes ? Number(post.likes) : 0}
										isSaved={isSaved}
										hideRecommendations={hideRecommendations}
									/>
								)}
							</BylineWrapper>
						)}
						{firstParagraph && isCommerce && !isNativeCommerce && (
							<StyledExcerpt
								kinjaMeta={kinjaMeta}
								hasHeadline={post.formattedHeadline && post.formattedHeadline.length > 0}
								postBody={trimExcerpt([parseNode(firstParagraph)], 117)}
							/>
						)}
						{nativeExcerpt && isNativeCommerce && (
							<StyledExcerpt
								kinjaMeta={kinjaMeta}
								hasHeadline={post.formattedHeadline && post.formattedHeadline.length > 0}
								nativeExcerpt={truncateHtml(nativeExcerpt, 117, { truncateLastWord: false, slop: 5, ellipsis: '…' })}
								isNativeAd
							/>
						)}
					</HeadlineOrExcerpt>
				</ContentContainer>
			</Article>
		</EnsureDefaultTheme>
	);
}

export default Compact;
