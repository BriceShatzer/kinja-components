/* @flow */

import * as React from 'react';
import {
	action,
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import README from './README.md';
import ArticleCard from './ArticleCard';

import stubbedPosts from '../../../__stubs__/manageBlogPosts.json';


const post = stubbedPosts.data.items[3];

storiesOf('4. Components|Manage Blog/Article Card', module)
	.addDecorator(withDocs(README))
	.add('Article Card', () => {
		post.vertical = 'io9';
		post.replyCount = 607;

		const Container = styled.div`
			max-width: 1088px;
			margin: 0 auto;
		`;

		return (
			<Container>
				<ArticleCard
					index={0}
					post={post}
					onEmbiggenClick={action('Embiggen icon clicked')}
					type="published"
				/>
			</Container>
		);
	});