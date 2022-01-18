/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	boolean,
	text
} from 'base-storybook';
import CheckboxList from './checkbox-list';
import Theme from 'kinja-components/components/theme';
import README from './README.md';

storiesOf('4. Components|Form/CheckboxList', module)
	.addDecorator(withDocs(README))
	.add('CheckboxList', () => {
		const blogProperties = ['The A.V. Club', 'Gizmodo', 'Kotaku', 'The Root', 'Clickhole',
			'Jalopnik', 'Lifehacker', 'Splinter', 'Deadspin', 'Jezebel', 'The Onion'];
		const checkboxProps = blogProperties.map(blog => {
			return {
				name: 'check',
				value: blog.replace(' ', '').replace('.','').toLowerCase(),
				label: blog,
				checked: boolean('Checked', true),
				onChange: console.log
			};
		});

		return (
			<Theme>
				<CheckboxList checkboxProps={checkboxProps} error={text('Error message', '')}/>
			</Theme>
		);
	});
