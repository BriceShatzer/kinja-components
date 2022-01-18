// @flow
import * as React from 'react';
import {
	action,
	storiesOf,
	blogGroup,
	select
} from 'base-storybook';
import styled from 'styled-components';

import Permalink from './permalink';
import FeaturedPermalink from './featured-permalink';
import VideoPermalink from './video-permalink';
import CommentsButtons from './comments-buttons';

import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';
import gizmodo from '../../__stubs__/gizmodo.json';
import kotaku from '../../__stubs__/kotaku.json';
import postResponse from '../../__stubs__/stubbedPostResponse.json';
import featuredPostResponse from '../../__stubs__/stubbedFeaturedPostResponse2.json';
import videoPostResponse from '../../__stubs__/stubbedVideoPostResponse.json';
import blogSales from '../../__stubs__/stubbedGizmodoBlogSales.json';
import author from '../../__stubs__/stubbedAuthorResponse.json';
import Theme from '../theme';
import { Main } from '../page-layout';

const authorUserProperties = {
	'5876237249237015770': {
		showBio: true,
		twitterHandle: 'kobunheat',
		bio: `Features Editor, Kotaku. Japanese curry aficionado. Author of the books <em>
		<a href="https://www.amazon.com/Power-Up-Japanese-Video-Games-World/dp/0486801497/">
		Power-Up: How Japanese Video Games Gave the World an Extra Life</a></em> and <em>
		<a href="https://bossfightbooks.com/products/final-fantasy-v-by-chris-kohler">Final Fantasy V</a></em> from Boss Fight Books.`
	}
};


storiesOf('4. Components|Permalink', module)
	.add('Default permalink', () => {
		const blog = Blog.fromJSON({
			...gizmodo,
			properties: {
				...gizmodo.properties,
				blogGroup: blogGroup()
			}
		});

		const post = Post.fromJSON(postResponse);

		const relatedPosts = post.relatedPosts.map(p => Post.fromJSON(p));

		const statsData = [{
			id: post.id,
			views: 1000,
			uniqueViews: 500
		}];

		return <Theme blog={blogGroup()}>
			<Main>
				<Permalink
					authors={[author]}
					blog={blog}
					blogSales={blogSales}
					starterPost={post}
					requestedPost={post}
					statsData={statsData}
					links={[]}
					embeddedVideos={[]}
					replyCount={100}
					likeCount={1}
					pageType="permalink"
					authorUserProperties={authorUserProperties}
					relatedPosts={relatedPosts}
					relatedBlogs={[Blog.fromJSON(kotaku)]}
					parentBlog={null}
					postNeighbors={{previousPermalink: post.permalink}}
					isGoogleNewsBot={false}
					specialSectionBlog={null}
					specialSectionData={null}
					commentsIframeUrl={''}
				/>
			</Main>
		</Theme>;
	})
	.add('Featured permalink', () => {
		const blog = Blog.fromJSON({
			...gizmodo,
			properties: {
				...gizmodo.properties,
				blogGroup: blogGroup()
			}
		});

		const featuredHeaderLayout = select(
			'Header layout',
			['Default', 'Magazine', 'Impact'],
			'Impact'
		);

		const post = Post.fromJSON({
			...featuredPostResponse,
			properties: JSON.stringify({
				...JSON.parse(featuredPostResponse.properties),
				featuredHeaderLayout
			})
		});

		const relatedPosts = post.relatedPosts.map(p => Post.fromJSON(p));

		return <Theme blog={blogGroup()}>
			<FeaturedPermalink
				authors={[author]}
				blog={blog}
				blogSales={blogSales}
				starterPost={post}
				requestedPost={post}
				statsData={null}
				links={[]}
				embeddedVideos={[]}
				replyCount={100}
				likeCount={-1}
				pageType="permalink"
				authorUserProperties={authorUserProperties}
				relatedPosts={relatedPosts}
				relatedBlogs={[Blog.fromJSON(kotaku)]}
				parentBlog={null}
				postNeighbors={{previousPermalink: post.permalink}}
				isGoogleNewsBot={false}
				specialSectionBlog={null}
				specialSectionData={null}
				commentsIframeUrl={''}
			/>
		</Theme>;
	})
	.add('Video permalink', () => {
		const blog = Blog.fromJSON({
			...gizmodo,
			properties: {
				...gizmodo.properties,
				blogGroup: blogGroup()
			}
		});

		const post = Post.fromJSON(videoPostResponse);

		const relatedPosts = post.relatedPosts.map(p => Post.fromJSON(p));

		return <Theme blog={blogGroup()}>
			<VideoPermalink
				authors={[author]}
				blog={blog}
				blogSales={blogSales}
				starterPost={post}
				requestedPost={post}
				statsData={null}
				links={[]}
				embeddedVideos={[]}
				replyCount={100}
				likeCount={-1}
				pageType="permalink"
				authorUserProperties={authorUserProperties}
				relatedPosts={relatedPosts}
				relatedBlogs={[Blog.fromJSON(kotaku)]}
				parentBlog={null}
				postNeighbors={{previousPermalink: post.permalink}}
				isGoogleNewsBot={false}
				specialSectionBlog={null}
				specialSectionData={null}
				commentsIframeUrl={''}
			/>
		</Theme>;
	})
	.add('Comments Buttons', () => {
		const StoryWrapper = styled.div`
			max-width: 636px;
			padding: 1rem;
			margin: 0 auto;
		`;

		return (
			<StoryWrapper>
				<CommentsButtons blogTheme="default"
					replyCount={22}
					onShowAllClick={action('Show All Clicked')}
					onReplyClick={action('Reply Click')}
				/>
			</StoryWrapper>
		);
	});
