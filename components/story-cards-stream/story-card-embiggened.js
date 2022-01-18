// @flow

import * as React from 'react';
import styled from 'styled-components';
import LargeOnStreamCardImage from './large-on-stream-card-media';
import Headline from '../post-elements/headline';
import Link from '../elements/link';
import { Anchor } from '../elements/link';
import Byline from '../post-elements/byline';
import MetaInfo, { MetaInfoWrapper } from '../post-elements/meta-info';
import Excerpt from '../post-elements/excerpt';
import media from '../../style-utils/media';
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
	display: flex;
	flex-direction: column;
	position: relative;
`;

export const MetaInfoContainer = styled.div`
	order: -1;
	${MetaInfoWrapper}:not(:empty) {
		margin: 5px 0;
	}
	${media.mediumUp`
		order: 0;
	`}
`;

const ExcerptContainer = styled.div`
	${media.smallOnly`
		display: none;
	`}
	${media.mediumUp`
		margin-top: 10px;
	`}
`;

const AssetContainer = styled.div`
	margin-bottom: 8px;
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
	${media.smallOnly`
		margin-top: 10px;
	`}
`;

const renderExcerpt = (excerpt, kinjaMeta) =>
	(excerpt && excerpt.length) ? (
		<ExcerptContainer>
			<Excerpt postBody={excerpt} kinjaMeta={kinjaMeta}/>
		</ExcerptContainer>
	) : null;

function StoryCardEmbiggened({
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
	repostBlog
}: StoryCardProps) {
	const commerceSource = assignCommerceSource(post, pageType);

	return (
		<Article className="js_post_item" data-id={post.id} data-index={index} data-commerce-source={commerceSource}>
			<AssetContainer>
				<LargeOnStreamCardImage
					post={post}
					blog={blog}
					pageType={pageType}
					index={index}
				/>
			</AssetContainer>
			<MetaInfoContainer>
				<MetaInfo
					category={post.categoryData}
					storyType={post.storyType}
					blog={blog}
					post={post}
					parentBlogName={parentBlogName}
					defaultBlogDisplayName={repostBlog && repostBlog.displayName}
					defaultBlogRecircGroup={repostBlog && repostBlog.properties && repostBlog.properties.recircGroup}
					defaultBlogGroup={repostBlog && repostBlog.blogGroup}
					isSponsored={post.sponsored}
					shouldShowStoryTypes={repostBlog ? repostBlog.blogGroup === (blog && blog.blogGroup) : true}
					isLivePost={isLivePost}
					isExternalPost={Boolean(post.permalinkRedirect)}
					pageType={pageType}
					index={index}
				/>
			</MetaInfoContainer>
			{post.headline && (<HeadlineContainer>
				<Link href={post.securePermalink}
					kalaEvent = {StreamPostClickKala(post.id, pageType)}
					events = {[
						StreamPostClick(index, post.securePermalink, pageType),
						(post.permalinkRedirect ? ExternalPostClick(index, post.securePermalink) : undefined),
						(post.isDeals ? KinjaDealsClick(index, post.securePermalink) : undefined)
					].filter(Boolean) }
				>
					<Headline embiggened level={2}>{post.formattedHeadline}</Headline>
				</Link>
			</HeadlineContainer>)}
			<BylineContainer>
				<Byline
					index={index}
					authors={authors}
					blog={blog}
					post={post}
					pageType={pageType}
					isScheduled={post.status === 'SCHEDULED'}
					repostBlog={repostBlog}
				/>
				{postToolsContents && <PostToolsContainerMobile>{postToolsContents}</PostToolsContainerMobile>}
			</BylineContainer>
			{renderExcerpt(excerpt, kinjaMeta)}
			{postToolsContents && <PostToolsContainerDesktop>{postToolsContents}</PostToolsContainerDesktop>}
		</Article>
	);
}

export default StoryCardEmbiggened;
