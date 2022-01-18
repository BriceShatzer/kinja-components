// @flow
import * as React from 'react';
import {
	storiesOf,
	number,
	withDocs,
	select
} from 'base-storybook';

import README from './README.md';
import ShowBrowser from './show-browser';
import tab from './__fixtures__/tab';
import blogs from 'kinja-components/config/blogs.json';

const getInitialState = () => Promise.resolve(tab);

storiesOf('4. Components|Show browser', module)
	.addDecorator(withDocs(README))
	.add('Show browser', () => (
		<div style={{width: 320, height: number('height', 400)}}>
			<ShowBrowser
				getData={getInitialState}
				blogGroup={select('Blog group', blogs, 'avclub')}
			/>
		</div>
	));
