/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';

import SearchInput from './searchBar';
import README from './README.md';

storiesOf('4. Components|Editor/Related Stories/Search', module)
	.addDecorator(withDocs(README))
	.add('Search Input field', () => {
		return (
			<div className="meta-container">
				<SearchInput />
			</div>
		);
	});
