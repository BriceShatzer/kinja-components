/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import {{COMPONENT_NAME}} from './{{COMPONENT_FILENAME}}';
import README from './README.md';

storiesOf('4. Components|{{COMPONENT_NAME}}', module)
	.addDecorator(withDocs(README))
	.add('Hello World', () => (
		<{{COMPONENT_NAME}} />
	));
