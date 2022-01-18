/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { Anchor } from 'kinja-components/components/elements/link';
import MetaTime from 'kinja-components/components/post-elements/meta-time';
import SponsoredLabel from 'kinja-components/components/post-elements/sponsored-label';
import NativeShareLabel from 'kinja-components/components/native-share-label';
import LabelCategory from 'kinja-components/components/post-elements/meta-info/label-category';
import LabelStoryType from  'kinja-components/components/post-elements/meta-info/label-storytype';
import Breadcrumbs from './breadcrumbs';
import { IconWrapper } from '../icon19/icon19';

import type { MetaInfoProps } from 'kinja-components/components/post-elements/meta-info/meta-info';
import type { StoryCardProps } from './';

export const StyledTime = styled(MetaTime)`
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-size: 14px;
	text-transform: uppercase;
	line-height: 20px;

	${props => props.isV3 && css`
		margin-right: 10px;
	`}

	${media.mediumUp`
		display: none;
	`}
`;

const MobileSeparator = styled.span`
	${media.smallOnly`
		&:before {
			content: "|";
			color: ${props => props.theme.color.gray};
			font-size: 14px;
			vertical-align: middle;
			display: block;
			padding: 0 8px;
		}
	`}
`;

const StyledSponsoredLabel = styled(SponsoredLabel)`
	display: flex;
	align-items: center;
	font-size: 14px;
	padding-right: 8px;
	text-transform: uppercase;
`;

const StyledNativeShareLabel = styled(NativeShareLabel)`
	display: flex;
	align-items: center;
	font-size: 14px;
	line-height: 25px;

	${media.smallOnly`
		${({ version }) => version === '2' && css`
			span > svg:not([aria-label~=DealsBox24]) {
				margin-right: 0;
				height: 12px;
				width: 12px;
			}
		`}
	`}
`;

const StyledMeta = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	#nativeLogo > div {
		display: flex;
	}

	${Anchor} {
		display: block;
	}
`;

const MetaContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	${props => props.isNative && css`
		${media.mediumUp`
			margin-top: -4px;
			margin-bottom: 10px;
		`}
	`}
`;

const MobileHideIfSpliced = styled.span`
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	> ${Anchor},
	> svg {
		margin-right: 8px;
	}

	${media.smallOnly`
		margin-top: initial;
		display: ${props => props.isSpliced && 'none'};

		> ${Anchor}:last-child {
			margin-right: 0;
		}
	`}
`;

const StyledBreadcrumbs = styled(Breadcrumbs)`
	display: none;

	${media.smallOnly`
		display: flex;
		margin-bottom: 0;

		${IconWrapper} {
			margin: -1px 5px 0 5px
		}
	`}
`;

function Meta(props: StoryCardProps & MetaInfoProps) {
	const {
		blog,
		category,
		defaultBlogDisplayName,
		defaultBlogGroup,
		defaultBlogHost,
		defaultBlogRecircGroup,
		index,
		isEditorial,
		isExternalPost,
		isNativeAd,
		isRepostBlogSameAsCurrentBlog,
		isSponsored,
		isV3,
		pageType,
		parentBlogName,
		post,
		repostBlog,
		shouldShowStoryTypes,
		storyType
	} = props;

	const canonicalHost = blog ? blog.canonicalHost : '';

	const NativeShareLabel = () => (
		<StyledNativeShareLabel
			blog={blog}
			defaultBlogDisplayName={defaultBlogDisplayName}
			defaultBlogGroup={defaultBlogGroup}
			defaultBlogHost={defaultBlogHost}
			defaultBlogRecircGroup={defaultBlogRecircGroup}
			index={index}
			isDeals={Boolean(post.isDeals)}
			isEditorial={isEditorial}
			isNative={isNativeAd}
			isPromoted={Boolean(post.editorial)}
			isSplice={Boolean(post.repost)}
			isSponsored={isSponsored}
			pageType={pageType}
			parentBlogName={parentBlogName}
			post={post}
			showExternalIcon={isExternalPost}
			showSharedLabel={!isNativeAd}
			showViewOnLabel={isNativeAd}
			version={isV3 ? '2' : '1'}
		/>
	);

	return (
		<MetaContainer isNative={isNativeAd}>
			<StyledMeta>
				{isV3 ? (
					<React.Fragment>
						{(post.repost || isNativeAd) && (
							<NativeShareLabel />
						)}
						{(shouldShowStoryTypes && !isNativeAd) ? (
							<React.Fragment>
								<React.Fragment>
									<StyledBreadcrumbs
										{...props}
										category={post.categoryData}
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
									{(post.storyType || post.repost || post.sponsored) && <MobileSeparator />}
								</React.Fragment>
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
								/>
							</React.Fragment>
						) : null}
					</React.Fragment>
				) : (
					<React.Fragment>
						{(shouldShowStoryTypes || post.sponsored) && (
							<MobileHideIfSpliced isSpliced={post.repost}>
								{isSponsored && (
									<StyledSponsoredLabel
										isEditorial={isEditorial}
										isBranded={(repostBlog && repostBlog.recircGroup === 'fmgSatire') || false}
										locale={blog && blog.locale}
									/>
								)}
								<LabelStoryType
									blog={blog}
									index={index}
									isExternalPost={isExternalPost}
									pageType={pageType}
									post={post}
									storyType={storyType}
								/>
								<LabelCategory
									canonicalHost={canonicalHost}
									category={category}
									index={index}
									isExternalPost={isExternalPost}
									pageType={pageType}
									storyType={storyType}
								/>
							</MobileHideIfSpliced>
						)}
						<NativeShareLabel />
						{(post.storyType || post.repost || post.sponsored || (isNativeAd && isEditorial)) && <MobileSeparator />}
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
							isEditorial={isEditorial}
						/>
					</React.Fragment>
				)}
			</StyledMeta>
		</MetaContainer>
	);
}

export default Meta;
