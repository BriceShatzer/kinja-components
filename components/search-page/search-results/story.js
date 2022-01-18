/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	blogGroup,
	storiesOf,
	action
} from 'base-storybook';

import Topics from './topics';
import Authors from './authors';
import { createBlogId } from 'kinja-magma/models/Id';

import Theme from 'kinja-components/components/theme';

storiesOf('4. Components|Search|Results', module)
	.add('Topics', () => {
		const Container = styled.div`
			width: 100%;
			max-width: 1120px;
			padding: 40px 20px;
			margin: 0 auto;
		`;

		const blogId = createBlogId(4);

		const items = [
			{blogId, source: 'Tag', suggestion: 'Books', cardinality: 123},
			{blogId, source: 'Tag', suggestion: 'Book covers', cardinality: 321},
			{blogId, source: 'Tag', suggestion: 'Book Titles', cardinality: 9},
			{blogId, source: 'Tag', suggestion: 'Book Lady', cardinality: 9},
			{blogId, source: 'Tag', suggestion: 'Book Worm', cardinality: 9}
		];

		return (
			<Theme blog={blogGroup()}>
				<Container>
					<Topics blogs={[]} redirectHandler={action('Topic Selected', {
						clearOnStoryChange: true
					})} items={items} />
				</Container>
			</Theme>
		);
	})
	.add('Authors', () => {
		const Container = styled.div`
			width: 100%;
			max-width: 1120px;
			padding: 40px 20px;
			margin: 0 auto;
		`;

		const items = [
			{id: '123456', displayName: 'Booker Simpson Long Name', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'booker'},
			{id: '54321', displayName: 'Booker Name', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'bookername'},
			{id: '98765', displayName: 'Booker Long', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'booker-long'},
			{id: '7584936', displayName: 'Booker Simpson', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'booker-simpson-never-dies'}
		];

		return (
			<Theme blog={blogGroup()}>
				<Container>
					<Authors redirectHandler={action('Author Selected', {
						clearOnStoryChange: true
					})} items={items} />
				</Container>
			</Theme>
		);
	});