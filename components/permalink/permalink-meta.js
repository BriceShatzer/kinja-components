// @flow

import * as React from 'react';
import styled from 'styled-components';

import media from '../../style-utils/media';
import PermalinkByline from '../post-elements/permalink-byline';
import { shouldHideAuthorsBasedOnBlog } from 'kinja-components/components/post-elements/byline/byline';
import { PostToolsWrapper } from '../post-tools';
import getShareToolsContents from 'kinja-magma/client/hydration/post-tools/utils/get-share-tools-contents';
import { ShareToolbarContainer } from 'kinja-components/components/share-toolbar';
import MetaToolbar from '../meta-toolbar';

import type User from 'kinja-magma/models/User';
import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type { PageType } from 'kinja-magma/models/PageType';
import type { KalaResponse } from 'kinja-magma/api/kala';

type PermalinkMetaProps = {
	authors: Array<User>,
	defaultBlog?: ?Blog,
	starterPost: Post,
	pageType: PageType,
	replyCount?: number,
	likeCount?: number,
	blog: Blog,
	statsData?: ?Array<KalaResponse>,
	isSecondScroll?: boolean
};

const BylineContent = styled.div`
	display: flex;
	justify-content: space-between;

	${media.smallOnly`
		width: 100%;
	`}
`;

const BylineContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	${media.smallOnly`
		flex-wrap: wrap;
		${BylineContent} + ${BylineContent} {
			margin-top: 15px;
		}
	`}
	${media.mediumUp`
		flex-wrap: nowrap;
	`}
`;

const ShareAndPostTools = styled.div`
	display: flex;
`;

const PermalinkMeta = (props: PermalinkMetaProps) => {
	const {
		authors,
		defaultBlog,
		starterPost,
		pageType,
		replyCount,
		likeCount,
		blog,
		statsData,
		isSecondScroll
	} = props;
	const { hideRecommendations, hideViewcounts,
		timezone, properties: { alternativeFiledToText } } = blog;
	const postStatsData = statsData && statsData[0] || null;

	// add defaultBlog to the post for calculating the Twitter share url
	const post = starterPost.defaultBlog ? starterPost : starterPost.clone({ defaultBlog });

	const shareToolsPosition = 'top';
	const { permalink, emailShareUrl, facebookShareUrl, twitterShareUrl } = post;
	const postShareUrls = { permalink, emailShareUrl, facebookShareUrl, twitterShareUrl };

	return (
		<BylineContainer>
			<BylineContent>
				<PermalinkByline
					hideAuthorsOnBlog={shouldHideAuthorsBasedOnBlog(blog)}
					authors={authors}
					pageType={pageType}
					post={post}
					blogProperties={{ alternativeFiledToText, timezone}}
					isSecondScroll={isSecondScroll}
				/>
			</BylineContent>
			<BylineContent>

				<MetaToolbar
					hideRecommendations={hideRecommendations}
					hideViewcounts={hideViewcounts}
					viewCount={Number(postStatsData && postStatsData.views) || 0}
					uniqueViewCount={Number(postStatsData && postStatsData.uniqueViews) || 0}
					replyCount={Number(replyCount) || 0}
					postId={post.id}
					permalink={post.permalink}
					likeCount={likeCount}
					isSecondScroll={isSecondScroll}
				/>

				<ShareAndPostTools>
					<ShareToolbarContainer position={shareToolsPosition}>
						{getShareToolsContents(
							{...postShareUrls, emailShareUrl: `${postShareUrls.emailShareUrl}%26utm_campaign=${shareToolsPosition}`},
							shareToolsPosition
						)}
					</ShareToolbarContainer>

					<PostToolsWrapper
						type={'permalink'}
						index={0}
						pageType={pageType}
						post={post}
					/>
				</ShareAndPostTools>

			</BylineContent>
		</BylineContainer>
	);
};

export default PermalinkMeta;
