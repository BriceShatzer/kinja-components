// @flow

import * as React from 'react';
import styled from 'styled-components';
import { storiesOf, withDocs, boolean } from 'base-storybook';

import PopularPosts from './popular-posts';
import Blog from 'kinja-magma/models/Blog';
import SidebarPost from 'kinja-magma/models/SidebarPost';

import gizmodoJSON from '../../../__stubs__/gizmodo.json';
import posts from '../__fixtures__/sidebar-posts';

import README from './README.md';

// Make sure we have proper variety in post dates
posts[0].publishTime.timestamp = Date.now() - 1000 * 60 * 60 * 23; // Yesterday
posts[2].publishTime.timestamp = Date.now() - 1000 * 60 * 60 * 24 * 3; // Few days ago

const PopularPostsWrapper = styled.div`
	max-width: 400px;
`;

storiesOf('4. Components|Post Promotion/Sidebar', module)
	.addDecorator(withDocs(README))
	.add('Popular posts', () => {
		return (
			<PopularPostsWrapper>
				<PopularPosts
					posts={posts.map(post => SidebarPost.fromJSON(post))}
					currentBlog={Blog.fromJSON(gizmodoJSON)}
					isRecent={boolean('isRecent', false)}
				/>
			</PopularPostsWrapper>
		);
	});
