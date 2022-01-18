/* @flow */

import * as React from 'react';
import {
	boolean,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';

import BasicButtons from './story.BasicButtons';
import BasicButtonsIcon from './story.BasicButtonsIcon';
import CommerceButtons from './story.CommerceButtons';
import CircleButtons from './story.CircleButtons';
import SocialMediaConnectButtons from './story.SocialMediaConnectButtons';
import SocialMediaShareButtons from './story.SocialMediaShareButtons';
import ThemedButtons from './story.ThemedButtons';

import README from './README.md';

storiesOf('3. Elements|Form/Button', module)
	.addDecorator(withDocs(README))
	.add('Basic Buttons', () => {
		const buttonProps = {
			small: boolean('small', false),
			fullwidth: boolean('fullwidth', false)
		};
		return (
			<BasicButtons {...buttonProps} />
		);
	})

	.add('Basic Buttons w/ Icon', () => {
		const buttonProps = {
			small: boolean('small', false),
			withLabel: boolean('label', true),
			labelPosition: select('labelPosition', {
				after: 'after',
				before: 'before'
			}, 'after'),
			fullwidth: boolean('fullwidth', false)
		};
		return (
			<BasicButtonsIcon {...buttonProps} />
		);
	})

	.add('Commerce Buttons', () => {
		const buttonProps = {
			small: boolean('small', false),
			fullwidth: boolean('fullwidth', false)
		};
		return (
			<CommerceButtons {...buttonProps} />
		);
	})

	.add('Circle Buttons', () => {
		const buttonProps = {
			small: boolean('small', false)
		};
		return (
			<CircleButtons {...buttonProps} />
		);
	})

	.add('Social Media Connect Buttons', () =>
		<SocialMediaConnectButtons />
	)

	.add('Social Media Share Buttons', () =>
		<SocialMediaShareButtons />
	)

	.add('Themed Buttons', () =>
		<ThemedButtons />
	);
