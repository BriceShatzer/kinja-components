/* @flow */

import * as React from 'react';

import {
	storiesOf,
	withDocs,
	action,
	text,
	boolean
} from 'base-storybook';

import Textfield from './textfield';
import ImageIcon from '../../icon19/Image';
import README from './README.md';

storiesOf('3. Elements|Form/Text Field', module)
	.addDecorator(withDocs(README))
	.add('Textfield', () => (
		<Textfield
			icon={<ImageIcon />}
			counter={boolean('Counter', false)}
			description={text('Description', 'Sample description')}
			disabled={boolean('Disabled', false)}
			error={text('Error message', '')}
			fullWidth={boolean('Full width', false)}
			name="test"
			onChange={action('Change')}
			placeholder={text('Placeholder', 'Sample placeholder')}
		/>
	));
