/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	text
} from 'base-storybook';
import EditableCaption from './editablecaption';
import README from './README.md';

storiesOf('3. Elements|Form/Editable Caption', module)
	.addDecorator(withDocs(README))
	.add('Editable Caption', () => (
		<EditableCaption
			html='Inner Html Text'
			error={text('Error message', '')}
			description={text('Description', '')}
			className='editable-caption'
			placeholder='Credit Field'
			onChange={action('Change')}
		/>
	));
