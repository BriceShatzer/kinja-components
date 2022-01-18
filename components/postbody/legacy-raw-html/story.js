// @flow

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';
import LegacyRawHtml from './legacyRawHtml';
import README from './README.md';

storiesOf('3. Elements|Post Body/LegacyRawHtml', module)
	.addDecorator(withDocs(README))
	.add('Default', () => {
		return (
			<React.Fragment>
				<LegacyRawHtml value={'<h1>Is this is a test? It has to be</h1>'}/>
			</React.Fragment>
		);
	});
