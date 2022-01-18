/* @flow */

import * as React from 'react';
import {
	boolean,
	select,
	storiesOf,
	text,
	withDocs
} from 'base-storybook';

import Button19 from './';
import Heart from '../icon19/Heart';
import BasicButtonsIcon from './story.BasicButtonsIcon';
import Button19Variants from './story.Button19Variants';

import README from './README.md';

storiesOf('3. Elements|Form/Button19', module)
	.addDecorator(withDocs(README))

	.add('Button19', () => {
		const buttonProps = {
			isSmall: boolean('isSmall', false),
			label: text('label', 'I love this button'),
			labelPosition: select('labelPosition', {
				after: 'after',
				before: 'before'
			}, 'after')
		};
		return (
			<BasicButtonsIcon {...buttonProps} />
		);
	})

	.add('Button19 Link', () => {
		return (
			<Button19
				tag={'a'}
				href={'https://kinja.com'}
				target={'_blank'}
				variant='primary'
				icon={<Heart/>}
				label={'Go to Kinja'}
			/>
		);
	})

	.add('Amazon, Facebook and Twitter Button19s', () => {
		const buttonProps = {
			isSmall: boolean('isSmall', false),
			label: text('label', 'I love this button'),
			labelPosition: select('labelPosition', {
				after: 'after',
				before: 'before'
			}, 'after')
		};
		return (
			<Button19Variants {...buttonProps} />
		);
	})
;
