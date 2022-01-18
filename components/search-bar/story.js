/* @flow */

import * as React from 'react';
import {
	action,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';

import SearchBar from './SearchBar';
import README from './README.md';


storiesOf('4. Components|Search', module)
	.addDecorator(withDocs(README))
	.add('Search Bar', () => (
		<div style={{ width: '400px', margin: '0 auto' }}>
			<SearchBar
				onSearch={action('Search Button Clicked')}
				placeholder={text('Placeholder', 'Search Published Posts')}
				onInputChanged={() => undefined}
			/>
		</div>
	));
