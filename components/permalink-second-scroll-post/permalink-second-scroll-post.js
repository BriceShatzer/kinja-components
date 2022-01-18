// @flow

import * as React from 'react';
import styled from 'styled-components';

import CommerceDisclaimer from '../post-elements/commerce-disclaimer';
import PermalinkHeader from '../permalink/permalink-header';
import PermalinkMeta from '../permalink/permalink-meta';
import PermalinkPost from '../post-elements/permalink-post';
import { parseNode } from 'postbody/BlockNode';
import Button from '../buttons';
import ArrowRight from '../icon19/ArrowRight';
import Link from 'kinja-components/components/elements/link';
import {
	PermalinkPreviewCTAClick
} from '../permalink/analytics';

import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type { PageType } from 'kinja-magma/models/PageType';
import type User from 'kinja-magma/models/User';
import type BlogSalesMetadata from 'kinja-magma/models/BlogSalesMetadata';
import type LinkType from 'kinja-magma/models/Link';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

type Props = {
	post: Post,
	blog: Blog,
	pageType: PageType,
	authors: Array<User>,
	blogSales: ?BlogSalesMetadata,
	links: Array<LinkType>,
	features?: { [name: string]: boolean },
	videoMetadata: Array<VideoMeta>
};

const CutOff = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 200px;
	z-index: 15;
	background: linear-gradient(to bottom, #fff0 0, #fff 80%);
	display: flex;
	align-items: flex-end;

	> * {
		flex: 1;
	}
`;

const PostCutOff = styled.div`
	max-height: 700px;
	position: relative;
	overflow: hidden;
`;

const MetaContainer = styled.div`
	margin-bottom: 24px;
`;

const PermalinkSecondScrollPost = (props: Props) => {
	const { post, blog, pageType,
		authors, blogSales, links, features, videoMetadata } = props;

	const replyCount = Number(post.replyCount) || 0;
	const likes = Number(post.likes) || 0;
	const nodes = post.body.map(node => parseNode(node));
	// On a slideshow, only show the first slide
	const pageBreakIndex = nodes.findIndex(node => node.type === 'PageBreak');
	const filteredNodes = post.template === 'Slideshow' && pageBreakIndex > 0 ? nodes.slice(0, pageBreakIndex) : nodes;

	return (
		<div>
			{blog && blog.isCommerce && !post.sponsored && <CommerceDisclaimer locale={blog.locale}/>}
			<PermalinkHeader starterPost={post} blog={blog} isSecondScroll/>
			<MetaContainer>
				<PermalinkMeta
					authors={authors}
					starterPost={post}
					statsData={[{
						id: post.id,
						views: Number(post.viewCount),
						uniqueViews: Number(post.uniqueViewCount)
					}]}
					replyCount={replyCount}
					likeCount={likes}
					pageType={pageType}
					blog={blog}
					isSecondScroll
				/>
			</MetaContainer>
			<PostCutOff>
				<PermalinkPost
					category={post.categoryData}
					postBody={filteredNodes}
					storyType={post.storyType}
					post={post}
					blog={blog}
					blogSales={blogSales}
					links={links}
					embeddedVideos={videoMetadata}
					features={features}
					isSecondScroll
				/>
				<CutOff>
					<Link
						href={post.permalink}
						events={[PermalinkPreviewCTAClick(post.permalink)]}
					>
						<Button
							label='See more'
							icon={<ArrowRight/>}
							fullwidth
							weight='tertiary'
						/>
					</Link>
				</CutOff>
			</PostCutOff>
		</div>
	);
};

export default PermalinkSecondScrollPost;
