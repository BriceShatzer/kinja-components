/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import {
	action,
	blogGroup,
	storiesOf,
	withDocs
} from 'base-storybook';

import RecentSearches from './';
import README from './README.md';


storiesOf('4. Components|Search', module)
	.addDecorator(withDocs(README))
	.add('Recent Searches', () => {
		const Container = styled.div`
			display: flex;
			justify-content: center;
			width: 100%;
			max-width: 100vw;
		`;

		const keywords = ['morning spoilers', 'applesauce'];

		return (
			<Container>
				<RecentSearches
					onClear={action('Clear click')}
					onClick={action('Keyword click')}
					keywords={keywords}
					theme={blogGroup()}
				/>
			</Container>
		);
	});