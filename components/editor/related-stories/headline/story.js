/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs
} from 'base-storybook';

import EditableHeadline from './editableHeadline';
import README from './README.md';

storiesOf('4. Components|Editor/Related Stories/Headline', module)
	.addDecorator(withDocs(README))

	.add('Editable Headline', () => {
		return (
			<div className="meta-container">
				<EditableHeadline value={'Related Stories'} />
			</div>
		);
	});
