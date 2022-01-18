/* @flow */

import * as React from 'react';
import {
	storiesOf,
	blogGroup
} from 'base-storybook';

import PermalinkSecondScrollPost from './';
import Theme from '../theme';
import { Main } from '../page-layout';
import gizmodo from '../../__stubs__/gizmodo.json';
import postResponse from '../../__stubs__/stubbedPostResponse.json';
import author from '../../__stubs__/stubbedAuthorResponse.json';
import blogSalesResponse from '../../__stubs__/stubbedBlogSales.json';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';
import BlogSalesMetadata from 'kinja-magma/models/BlogSalesMetadata';

storiesOf('4. Components|Second scroll', module)
	.add('Permalink second scroll post', () => {
		const post = Post.fromJSON(postResponse);
		const blog = Blog.fromJSON(gizmodo);
		const blogSales = BlogSalesMetadata.fromJSON(blogSalesResponse);

		return (
			<Theme blog={blogGroup()}>
				<Main>
					<PermalinkSecondScrollPost
						authors={[author]}
						post={post}
						blog={blog}
						pageType='permalink'
						replyCount={30}
						likeCount={30}
						statsData={[{id: post.id, views: 30, uniqueViews: 30}]}
						links={[]}
						blogSales={blogSales}
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
								language: '',
								url: ''
							}],
							network: '',
							programId: '',
							publishedTimestamp: '',
							duration: null
						}]}
					/>
				</Main>
			</Theme>
		);
	});
