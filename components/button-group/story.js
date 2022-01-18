/* @flow */

import * as React from 'react';
import {
	action,
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';
import ButtonGroup from './ButtonGroup';
import ButtonGroupItem from './ButtonGroupItem';
import HeartIcon from 'kinja-components/components/icon19/Heart';
import README from './README.md';

storiesOf('3. Elements|Form/Button Group', module)
	.addDecorator(getStory => {
		require('./story.sass');
		return getStory();
	})
	.addDecorator(withDocs(README))
	.add('Button Group', () => {
		const buttonGroupProps = {
			small: boolean('small', false),
			onChange: action('Selected Button Value')
		};

		return (
			<ButtonGroup {...buttonGroupProps}>
				<ButtonGroupItem label="A Button" value="First Button" selected />
				<ButtonGroupItem label="Middle Button" value="Middle Button" />
				<ButtonGroupItem
					icon={<HeartIcon />}
					label="Hearted Button"
					labelPosition="after"
					value="Hearted Button"
				/>
			</ButtonGroup>
		);
	});
