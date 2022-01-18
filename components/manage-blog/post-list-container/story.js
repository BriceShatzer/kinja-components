/* @flow */

import * as React from 'react';
import {
	action,
	boolean,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';
import shortid from 'shortid';
import styled from 'styled-components';

import PostListContainer from './PostListContainer';
import ArticleCard from '../article-card';
import README from './README.md';

import stubbedPosts from '../../../__stubs__/manageBlogPosts.json';


const Container = styled.div`
	width: 100%;
	max-width: 1008px;
	margin: 0 auto;
`;

const Statuses = {
	published: 'published',
	scheduled: 'scheduled',
	drafts: 'drafts'
};

const post = num => stubbedPosts.data.items[num];
storiesOf('4. Components|Manage Blog/Containers', module)
	.addDecorator(withDocs(README))
	.add('Post List Container', () => {
		const status = select('Status', Statuses, 'published');

		const PostElement = post => {
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
			post.authors = authors;
			post.vertical = 'io9';
			post.replyCount = 607;
			post.pageViews = '10.3K';
			post.lastEditedBy = 'Bradley Brownell';

			return <ArticleCard
				index={0}
				post={post}
				onEmbiggenClick={action('Embiggen icon clicked')}
				type={status}
				key={shortid.generate()}
			/>;
		};

		const PostList = [
			PostElement(post(2)),
			PostElement(post(5)),
			PostElement(post(8)),
			PostElement(post(13)),
			PostElement(post(19))
		];

		return (
			<Container>
				<PostListContainer
					hasMore={boolean('Has More Item', false)}
					isLoading={boolean('Loading', false)}
					onLoadMoreClick={action('Load More')}
					status={status}
				>
					{PostList}
				</PostListContainer>
			</Container>
		);
	});
