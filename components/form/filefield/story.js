/* @flow */

import * as React from 'react';

import {
	storiesOf,
	withDocs,
	action,
	text
} from 'base-storybook';

import FileField from './filefield';
import README from './README.md';

storiesOf('3. Elements|Form/File Upload', module)
	.addDecorator(withDocs(README))
	.add('File Upload', () => (
		<FileField
			name="file"
			description={text('description', '')}
			error={text('error', '')}
			onChange={action('file change')}
		/>
	));
