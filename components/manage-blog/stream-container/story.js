/* @flow */

import * as React from 'react';
import {
	action,
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import StreamContainer from './StreamContainer';
import README from './README.md';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';

import stream from '../../../__stubs__/stubbedStream.json';
import blog from '../../../__stubs__/gizmodo.json';
import stubbedPosts from '../../../__stubs__/manageBlogPosts.json';


const Container = styled.div`
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
`;

const authors = [{
	avatar: {
		id: '18mk8augnk3a5jpg',
		format: 'jpg'
	},
	displayName: 'Matt Novak',
	id: '489539437',
	screenName: 'mattnovak',
	isSuperuser: false
}];
const publishTimeMillis = Date.now() + 60000;

const storyObject = {
	authors,
	publishTimeMillis,
	status: 'SCHEDULED'
};
const post_1 = Post.fromJSON(Object.assign({}, stubbedPosts.data.items[3], storyObject));
const post_2 = Post.fromJSON(Object.assign({}, stubbedPosts.data.items[5], storyObject));
const postList = [post_1, post_2];


storiesOf('4. Components|Manage Blog/Containers', module)
	.addDecorator(withDocs(README))
	.add('Stream Container', () => {

		const articles = stream.items.map(_ => {
			return Post.fromJSON(_.post);
		});

		return (
			<Container>
				<StreamContainer
					hasActivePromotions
					blog={Blog.fromJSON(blog)}
					hasMore={true}
					isLoading={boolean('isLoading', false)}
					onEmbiggenClick={action('Embiggen Post')}
					onLoadMoreClick={action('Load More Posts')}
					posts={articles}
					scheduledPosts={postList}
				/>
			</Container>
		);
	});