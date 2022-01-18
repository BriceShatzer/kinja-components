/* @flow */

import * as React from 'react';
import {
	action,
	boolean,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';

import Toggle from './Toggle';
import README from './README.md';

storiesOf('3. Elements|Form/Toggle', module)
	.addDecorator(withDocs(README))
	.add('Toggle', () => (
		<Toggle
			checked={boolean('Default Checked', false)}
			label={text('Label', 'Toggle World Peace')}
			name="story-toggle"
			onChange={action('Checked')}
			small={boolean('Small', false)}
		/>
	));
