/* @flow */

import * as React from 'react';
import {
	storiesOf,
	blogGroup,
	select
} from 'base-storybook';

import FeaturedSecondScrollPost from './';
import Theme from '../theme';
import { Main } from '../page-layout';
import gizmodo from '../../__stubs__/gizmodo.json';
import featuredPostResponse from '../../__stubs__/stubbedFeaturedPostResponse2.json';
import videoPostResponse from '../../__stubs__/stubbedVideoPostResponse.json';
import author from '../../__stubs__/stubbedAuthorResponse.json';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';

storiesOf('4. Components|Second scroll', module)
	.add('Featured second scroll post', () => {
		const posts = {
			'Featured permalink': featuredPostResponse,
			'Video permalink': videoPostResponse
		};
		const selectedPost = select('Post', [
			'Featured permalink',
			'Video permalink'
		], 'Featured permalink');
		const post = Post.fromJSON({
			...posts[selectedPost],
			likes: 10,
			viewCount: 1000,
			replyCount: 100
		});
		const blog = Blog.fromJSON(gizmodo);

		return (
			<Theme blog={blogGroup()}>
				<Main>
					<FeaturedSecondScrollPost
						authors={[author]}
						post={post}
						blog={blog}
						pageType='permalink'
						statsData={[{id: post.id, views: 30, uniqueViews: 30}]}
						videoMetadata={[{
							id: '',
							description: '',
							poster: { id: '', format: 'png' },
							title: '',
							tags: [],
							monetizable: false,
							videoPage: false,
							videoRecirc: false,
							isLooping: false,
							streamingUrl: '',
							captions: [{
								format: '',
								id: '',
								label: '',
								language: ''
							}],
							network: '',
							programId: ''
						}]}
					/>
				</Main>
			</Theme>
		);
	});
