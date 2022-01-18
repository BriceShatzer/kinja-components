/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	blogGroup,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';

import PopularSearch from './';
import README from './README.md';


export const keywords = ['weather', 'maps', 'speed', 'triceratops', 'olympics',
	'r kelly', 'arturia', 'clams casino', 'honda', 'thenx'];

storiesOf('4. Components|Search', module)
	.addDecorator(withDocs(README))
	.add('Popular Search', () => {
		const Container = styled.div`
			width: 100%;
			max-width: 190px;
		`;

		return (
			<Container>
				<PopularSearch
					blogName={text('blogName', 'Gizmodo')}
					onClick={action('Tag click')}
					keywords={keywords}
					theme={blogGroup()}
				/>
			</Container>
		);
	});