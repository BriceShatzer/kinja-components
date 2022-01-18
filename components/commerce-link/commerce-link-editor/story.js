/* @flow */

import * as React from 'react';
import {
	storiesOf,
	action,
	withDocs
} from 'base-storybook';
import CommerceLinkEditor from './commerce-link-editor';
import README from './README.md';

require('./story.sass');


storiesOf('4. Components|Commerce Link Editor', module)
	.addDecorator(withDocs(README))
	.add('CommerceLink Editor', () => (
		<CommerceLinkEditor
			onSubmit={action('Submit')}
			onCancel={action('Cancel')}
		/>
	));
