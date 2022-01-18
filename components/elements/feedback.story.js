/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	select,
	text,
	boolean
} from 'base-storybook';
import README from './FEEDBACK.md';
import Feedback from './feedback';
import Theme from 'kinja-components/components/theme';

const feedbackColor = [
	'error',
	'alert',
	'success',
	'default'
];

const feedbackArrow = [
	null,
	'topleft',
	'topcenter',
	'topright',
	'bottomleft',
	'bottomcenter',
	'bottomright'
];

storiesOf('3. Elements|Feedback', module)
	.addDecorator(withDocs(README))
	.add('Feedback', () => (
		<Theme>
			<div style={{maxWidth: '400px', marginBottom: '16px'}}>
				<Feedback
					text={text('text', 'Check yourself before you wreck yourself')}
					color={select('color', feedbackColor, 'success')}
					arrow={select('arrow', feedbackArrow, 'bottomcenter')}
					shadow={boolean('shadow', false)}
				/>
			</div>
		</Theme>
	));
