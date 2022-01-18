/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import media from 'kinja-components/style-utils/media';
import OnScreen from 'kinja-components/components/hoc/on-screen';

import FeedItem from './feed-item';
import FeedItemV2 from './feed-item.v2';
import AsideTools from 'kinja-components/components/story-cards-stream/aside-tools';
import {
	PromotionNativeAd,
	MobileAd
} from '../ad-slot/ads';
import InlineAdContainer from '../ad-slot/inline-ad-container';
import { FeedStreamContainer } from './feed-stream-container';
import { RecentVideoContainer } from './recent-video-container';
import { isCommerceUrl } from 'kinja-components/utils/checkForCommerceUrl';
import calculateExcerpt from './calculateExcerpt';

import VideoIcon from 'kinja-components/components/icon19/Video24';

import Post from 'kinja-magma/models/Post';
import type { StoryCardProps } from '../story-cards-stream';
import type { FeedStreamProps } from './';

const NativeAdContainer = styled.div`
	margin-left: ${props => `-${props.theme.columnPadding}`};
	position: relative;

	.ad-container {
		border-bottom: 0;
	}

	::after {
		border-bottom: 1px solid ${props => props.theme.color.lightgray};
		bottom: 0;
		content: "";
		height: 1px;
		left: ${props => props.theme.columnPadding};
		position: absolute;
		width: ${props => `calc(100% - ${props.theme.columnPadding})`};
	}

	${media.mediumUp`
		margin-right: ${props => (props.padded && !props.isV2) && `calc(-82px - ${props.theme.columnPadding})`};
		margin: ${props => props.isV2 && `0 -${props.theme.columnPadding} 0 calc(-66px - ${props.theme.columnPadding})`};

		::after {
			left: ${props => props.isV2 && '82px'};
			width: ${props => !props.isV2 && `calc(100% - 82px - (${props.theme.columnPadding} * 2))`};
			width: ${props => props.isV2 && `calc(100% - 82px - ${props.theme.columnPadding})`};
		}
	`}
`;

export const StyledAsideTools = styled(AsideTools)`
	display: none;
	${media.mediumUp`
		display: flex;
		left: calc(-48px - 18px);
		position: absolute;
	`}
`;

const AsideContainer = styled.div`
	display: none;
	color: ${props => props.theme.color.gray};

	${media.mediumUp`
		left: calc(-48px - 18px);
		min-width: 48px;
		position: absolute;
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 48px;
		top: 30px;
		width: 48px;
	`}
`;

const RecentVideoWrapper = styled.div`
	position: relative;
`;

const OnScreenMobileAd = OnScreen(MobileAd, { offset: 90, once: true, partialVisibility: true });

function FeedStream({
	authors,
	blog,
	kinjaMeta,
	posts,
	pageType,
	repostBlogs,
	parentBlogs,
	discussionSettings,
	withAuthorAvatar = false,
	withPostTools = false,
	embiggenPosts = false,
	simpleEmbiggen = false,
	indices,
	isV2 = false,
	isV3 = false,
	withExcerpt,
	nativeStyleTemplate = 'stream_list_item_v3',
	embeddedVideos = []
}: FeedStreamProps): React$Node {

	/*
		Maps Post object properties to FeedItem props.
	*/
	const feedItemProps = (post: Post, index: number): $Diff<StoryCardProps, {index: number}> => {
		const discussionSetting = discussionSettings && discussionSettings[post.id].pop(); // y mutate this array?
		const postType = Post.getType(post, discussionSetting);
		const isLivePost = discussionSetting &&
			discussionSetting.status === 'InProgress' &&
			(postType === 'LIVEBLOG' || postType === 'QA');
		const isSplicedPost = !!post.repost;
		const isSponsoredPost = !!post.sponsored;
		const isRoundup = !!post.isRoundup;
		const defaultBlog = repostBlogs && repostBlogs[post.id] && repostBlogs[post.id].find(blog => blog.id === post.defaultBlogId);
		const featuredVideoId = post.featuredMedia && post.featuredMedia.type === 'KinjaVideo' && post.featuredMedia.id;

		return {
			withPostTools,
			embiggenPosts,
			simpleEmbiggen,
			authors: authors && authors[post.id],
			blog,
			isCommerce: isCommerceUrl(post.permalink),
			isRoundup,
			isLivePost,
			isSplicedPost,
			isSponsoredPost,
			kinjaMeta,
			pageType,
			parentBlogName: parentBlogs && parentBlogs[post.defaultBlogId] && parentBlogs[post.defaultBlogId].displayName,
			post,
			excerpt: calculateExcerpt(post, index),
			repostBlog: post.repost && defaultBlog,
			defaultBlog,
			featuredVideo: embeddedVideos.find(v => v.id === featuredVideoId)
		};
	};

	/*
		Predicates used to determine what components need to be prepended to a an item at a given position in the feed.
	*/
	const shouldInsertRecentVideo = (index: number): boolean => !!indices && !!indices.recentVideo && indices.recentVideo.includes(index);
	const shouldInsertNativeAd = (index: number): boolean => !!indices && !!indices.instreamNativeAd && indices.instreamNativeAd.includes(index);
	const shouldInsertMobileAd = (index: number): boolean => !!indices && !!indices.instreamMobileAd && indices.instreamMobileAd.includes(index);

	return (
		<FeedStreamContainer
			padded={withPostTools}
			isV2={isV2}
		>
			{posts.map((post, index) => {
				return <React.Fragment key={`post__${post.id}`}>
					{/* Items prepended to a post get the same index as the post following them */}
					{shouldInsertMobileAd(index) && <InlineAdContainer mobileOnly hideBorder><OnScreenMobileAd /></InlineAdContainer>}
					{shouldInsertRecentVideo(index) && (
						<RecentVideoWrapper>
							<AsideContainer>
								<VideoIcon />
							</AsideContainer>
							<RecentVideoContainer/>
						</RecentVideoWrapper>
					)}
					{shouldInsertNativeAd(index) &&
						<NativeAdContainer padded={withPostTools} isV2={isV2}>
							<PromotionNativeAd ppPosition={`${index}`} nativeStyleTemplate={nativeStyleTemplate}/>
						</NativeAdContainer>}
					{isV2 ? (
						<FeedItemV2
							{...feedItemProps(post, index)}
							AsideToolsComponent={StyledAsideTools}
							index={index}
							isV2
							isV3={isV3}
							withAuthorAvatar={withAuthorAvatar}
						/>
					) : (
						<FeedItem
							{...feedItemProps(post, index)}
							index={index}
							withExcerpt={withExcerpt}
						/>
					)}
				</React.Fragment>;
			}
			)}
		</FeedStreamContainer>
	);
}

export default FeedStream;
