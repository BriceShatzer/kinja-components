/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	boolean
} from 'base-storybook';
import InsetEditor from './inset-editor';
import type { CloudinaryResponse } from '../../form/image-upload/types';
import README from './README.md';

require('./story.sass');

const createResponse = (image: string | File): CloudinaryResponse => {
	const url = typeof image === 'string' ? image : 'file';

	return {
		public_id: 'dzeyagxukyan2efhnnnj',
		url,
		format: 'jpg',
		width: 736,
		height: 1124
	};
};

storiesOf('4. Components|Review', module)
	.addDecorator(withDocs(README))
	.add('Inset Editor', () => (
		<InsetEditor
			alignment="Left"
			language="en-US"
			onSubmit={action('Submit')}
			onCancel={action('Cancel')}
			imageUploader={(image: string | File) =>
				new Promise(resolve => setTimeout(() => resolve(createResponse(image)), 2000))}
			canInsertBox={boolean('Can insert box', true)}
		/>
	));
