/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	blogGroup,
	boolean,
	number,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';

import PostList from './post-list';
import README from './README.md';
import posts from 'kinja-components/__stubs__/postObjects.json';
import TheOnion from 'kinja-components/__stubs__/stubbedBlog.2.json';
import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';


storiesOf('4. Components|Search', module)
	.addDecorator(withDocs(README))
	.add('Post List', () => {
		const Container = styled.div`
			width: 100%;
			max-width: 800px;
			padding: 10px;
			margin: 0 auto;
		`;

		const stories = select('Stories From', {
			'1 blog': ['Gizmodo'],
			'2 blogs': ['Gizmodo', 'Lifehacker'],
			'3 blogs': ['Gizmodo', 'Lifehacker', 'Jalopnik']
		}, ['Gizmodo']);

		return (
			<Container>
				<PostList
					blog={Blog.fromJSON(TheOnion)}
					isLoading={false}
					networkBlogs={[]}
					searchTerms={'hi!'}
					currentBlog={blogGroup()}
					hasMoreResults={false}
					dividerIndex={number('Divider Index', 6)}
					hasResults={boolean('Has Results', true)}
					networkName="G/O Media"
					numberOfResults={number('No. Of Results', 450)}
					onDividerClick={action('Divider Click')}
					onMoreStoriesClick={action('More stories click')}
					pageType="search"
					posts={posts.items.slice(0, 10).map(post => Post.fromJSON(post))}
					storiesFrom={stories}
					simpleEmbiggen
				/>
			</Container>
		);
	});
