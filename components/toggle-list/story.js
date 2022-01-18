/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action
} from 'base-storybook';
import ToggleList from './toggle-list';
import README from './README.md';

const toggles = [
	{
		name: 'noBlogBylines',
		checked: true,
		label: 'Bylines',
		onChange: action('change'),
		small: false
	},
	{
		name: 'commentsDisabled',
		checked: true,
		label: 'Comments',
		onChange: action('change'),
		small: false
	},
	{
		name: 'hideViewcounts',
		checked: true,
		label: 'Pageviews',
		onChange: action('change'),
		small: false
	}
];

storiesOf('4. Components|Form/Toggle List', module)
	.addDecorator(withDocs(README))
	.add('default', () => (
		<div style={{ 'minWidth': 800 }}>
			<ToggleList toggles={toggles} />
		</div>
	));
