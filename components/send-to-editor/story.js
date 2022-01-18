/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action,
	select
} from 'base-storybook';

import SendToEditor from './send-to-editor';
import README from './README.md';

require('./story.sass');

const notes = `Run on: 01/01/01
Word Count: 42
Photo from AP
Photographer name: Mekk Elek
`;

storiesOf('4. Components|Form/Send to Editor', module)
	.addDecorator(withDocs(README))
	.add('Send to Editor', () => (
		<SendToEditor
			language={select('Language', ['en-US', 'es-ES'], 'en-US')}
			onSubmit={action('Submit')}
			onCancel={action('Cancel')}
			initialValues={({ notes })}
		/>
	));
