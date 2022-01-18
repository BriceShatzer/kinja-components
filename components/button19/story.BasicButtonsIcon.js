/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { blogGroup } from 'base-storybook';
import Button19 from './';
import Heart from '../icon19/Heart';
import Theme from 'kinja-components/components/theme';


const BasicButtonsIcon = ({
	labelPosition,
	isSmall,
	label
}: {
	labelPosition: 'before' | 'after',
	isSmall: boolean,
	label: string
}) => {
	const props = {
		addMargin: true,
		isSmall,
		label,
		labelPosition
	};

	const Title = styled.h2`
		margin-bottom: 1rem;
	`;

	const ButtonWrapper = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1em;
		margin: 1em;
		${props => props.isDark && 'background-color: #000;'}

		${Title} {
			${props => props.isDark && 'color: #fff;'}
		}
	`;

	const Column = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 15px;
		margin-bottom: 0;

		/* to have top margin between button with same style, but different variant */
		[class*="ButtonWrapper"] + [class*="ButtonWrapper"] {
			margin-top: 20px;
		}
	`;

	const Buttons = (
		<Theme blog={blogGroup()}>
			<>
				<ButtonWrapper>
					<Column>
						<Title>Primary</Title>
						<Button19 variant='primary' icon={<Heart/>} {...props} />
					</Column>
					<Column>
						<Title>Secondary</Title>
						<Button19 variant='secondary' icon={<Heart/>} {...props} />
					</Column>
					<Column>
						<Title>Tertiary</Title>
						<Button19 variant='tertiary' icon={<Heart/>} {...props} />
					</Column>
					<Column>
						<Title>Toggle</Title>
						<Button19 variant='toggleInactive' icon={<Heart/>} {...props} />
						<Button19 variant='toggleActive' icon={<Heart/>} {...props} />
					</Column>
					<Column>
						<Title>Disabled</Title>
						<Button19 disabled icon={<Heart/>} {...props} />
						<Button19 variant='secondary' isDisabled={true} icon={<Heart/>} {...props} />
						<Button19 variant='tertiary' isDisabled={true} icon={<Heart/>} {...props} />
						<Button19 variant='toggleActive' isDisabled={true} icon={<Heart/>} {...props} />
					</Column>
				</ButtonWrapper>
				<ButtonWrapper isDark>
					<Column>
						<Title>Primary Dark</Title>
						<Button19 variant='primaryDark' icon={<Heart/>} {...props} />
					</Column>
					<Column>
						<Title>Secondary Dark</Title>
						<Button19 variant='secondaryDark' icon={<Heart/>} {...props} />
					</Column>
					<Column>
						<Title>Tertiary Dark</Title>
						<Button19 variant='tertiaryDark' icon={<Heart/>} {...props} />
					</Column>
					<Column>
						<Title>Disabled Dark</Title>
						<Button19 variant='primaryDark' isDisabled={true} icon={<Heart/>} {...props} />
						<Button19 variant='secondaryDark' isDisabled={true} icon={<Heart/>} {...props} />
						<Button19 variant='tertiaryDark' isDisabled={true} icon={<Heart/>} {...props} />
					</Column>
				</ButtonWrapper>
			</>
		</Theme>
	);
	return Buttons;
};

export default BasicButtonsIcon;
