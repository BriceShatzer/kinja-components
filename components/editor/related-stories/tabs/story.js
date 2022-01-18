/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';

import Tabs from './tabs';
import README from './README.md';

storiesOf('4. Components|Editor/Related Stories/Tabs', module)
	.addDecorator(withDocs(README))
	.add('Tabs', () => {
		return (
			<div className="meta-container">
				<Tabs tabIndex={0} />
			</div>
		);
	});
