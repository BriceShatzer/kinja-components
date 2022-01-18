/* @flow */

import React from 'react';
import styled, { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import StoryType from 'kinja-magma/models/StoryType';
import TypedTagData from 'kinja-magma/models/TypedTagData';
import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';
import { Anchor } from 'kinja-components/components/elements/link';
import NativeShareLabel from 'kinja-components/components/native-share-label';
import { isStudioAtGizmodo, isOnionLabs } from 'kinja-components/utils/blog';
import LivePostLabel from '../live-post-label';
import SponsoredLabel from '../sponsored-label';
import LabelCategory from './label-category';
import LabelStoryType from  './label-storytype';

import type { RecircGroup } from 'kinja-components/components/types';

export type MetaInfoProps = {
	blog?: Blog,
	repostBlog?: ?Blog,
	canonicalHost?: ?string,
	category?: ?TypedTagData,
	defaultBlogDisplayName?: ?string,
	defaultBlogGroup?: ?string,
	defaultBlogHost?: ?string,
	defaultBlogRecircGroup?: ?RecircGroup,
	index: number,
	isEditorial?: boolean,
	isExternalPost?: boolean,
	isLivePost?: boolean,
	isNativeAd?: boolean,
	isRepostBlogSameAsCurrentBlog?: boolean,
	isSponsored?: boolean,
	pageType: string,
	parentBlogName?: ?string,
	post?: Post,
	shouldShowStoryTypes?: boolean,
	storyType?: ?StoryType,
	multiline?: boolean,
	withoutTheme?: boolean
};

export const MetaInfoWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;

	${media.mediumDown`
		flex-direction: row;
	`}
`;

const CategoryWrapper = styled.div`
	display: flex;
	${media.mediumDown`
		${Anchor}:not(:first-of-type),
		> svg {
			display: none;
		}
	`}

	svg {
		width: 15px;
		margin: 2px 2px 0 2px;
	}
`;

const LivePostLabelWrapper = styled.div`
	margin-right: 10px;

	${props => props.multiline && css`
		${media.mediumUp`
			width: 100%;
		`}
	`}
`;

const MetaInfo = (props: MetaInfoProps) => {
	const {
		blog,
		repostBlog,
		category,
		defaultBlogDisplayName,
		defaultBlogGroup,
		defaultBlogRecircGroup,
		index,
		isEditorial,
		isExternalPost,
		isLivePost,
		isSponsored,
		isNativeAd,
		pageType,
		parentBlogName,
		post,
		shouldShowStoryTypes,
		storyType,
		multiline
	} = props;

	const canonicalHost = blog ? blog.canonicalHost : '';

	return (
		<EnsureDefaultTheme>
			<MetaInfoWrapper>
				{isLivePost && (
					<LivePostLabelWrapper multiline={multiline}>
						<LivePostLabel locale={blog && blog.locale} />
					</LivePostLabelWrapper>
				)}
				{isSponsored && (
					<SponsoredLabel
						isEditorial={isEditorial}
						isBranded={(repostBlog && repostBlog.recircGroup === 'fmgSatire') || false}
						locale={blog && blog.locale}
					/>
				)}
				{shouldShowStoryTypes && (
					<CategoryWrapper>
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
					</CategoryWrapper>
				)}
				{post && !isStudioAtGizmodo(post.defaultBlogId) && !isOnionLabs(post.defaultBlogId) &&
					<NativeShareLabel
						blog={blog}
						parentBlogName={parentBlogName}
						defaultBlogDisplayName={defaultBlogDisplayName}
						defaultBlogRecircGroup={defaultBlogRecircGroup}
						defaultBlogGroup={defaultBlogGroup}
						showSharedLabel={!isNativeAd}
						showViewOnLabel={isNativeAd}
						showExternalIcon={isExternalPost}
					/>
				}
			</MetaInfoWrapper>
		</EnsureDefaultTheme>
	);
};

MetaInfo.defaultProps = {
	shouldShowStoryTypes: true,
	multiline: false
};

export default MetaInfo;
