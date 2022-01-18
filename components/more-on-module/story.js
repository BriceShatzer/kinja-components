// @flow

import React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import MoreOnModule from './';
import README from './README.md';
import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';

import posts from 'kinja-components/__stubs__/stubbedPosts.json';
import blog from 'kinja-components/__stubs__/gizmodo.json';


storiesOf('4. Components|Post Promotion/More On Module', module)
	.addDecorator(withDocs(README))
	.add('More On Module', () => {
		const Container = styled.div`
			width: 100%;
			max-width: 666px;
			padding: 0 1rem;
			margin: 0 auto;
		`;

		return (
			<Container>
				<MoreOnModule
					blog={Blog.fromJSON(blog)}
					posts={posts.data.slice(0, 4).map(post => Post.fromJSON(post))}
				/>
			</Container>
		);
	});
