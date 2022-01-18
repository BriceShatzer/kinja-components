/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	action
} from 'base-storybook';
import ReviewData from './review-data';
import README from './README.md';

storiesOf('4. Components|Review', module)
	.addDecorator(withDocs(README))
	.add('Review data', () => (
		<ReviewData
			value={[{
				label: 'Director',
				value: 'Ridley Scott'
			}, {
				label: 'Year',
				value: '1979'
			}]}
			onChange={action('Change')}
			language="en-US"
			name="story"
		/>
	));
