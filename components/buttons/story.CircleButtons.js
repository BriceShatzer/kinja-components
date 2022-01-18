/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Heart from '../icon19/Heart';
import Pin from '../icon19/Pin';
import Checkmark from '../icon19/Checkmark';


const CircleButtons = () => {
	const ButtonWrapper = styled.div`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	`;

	const Column = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		width: auto;
		padding: 0 15px;
		margin-bottom: 0;

		[class*="ButtonWrapper"] + [class*="ButtonWrapper"] {
			margin-top: 20px;
		}
	`;

	const Title = styled.h2`
		margin-bottom: 1rem;
	`;

	const Buttons = (
		<ButtonWrapper>
			<Column>
				<Title>Primary</Title>
				<Button sort='circle' icon={<Heart/>} />
				<Button sort='circle' small icon={<Heart/>} />
			</Column>
			<Column>
				<Title>Secondary</Title>
				<Button weight='secondary' sort='circle' icon={<Pin/>} />
				<Button weight='secondary' sort='circle' small icon={<Pin/>} />
			</Column>
			<Column>
				<Title>Tertiary</Title>
				<Button weight='tertiary' sort='circle' icon={<Checkmark/>} />
				<Button weight='tertiary' sort='circle' small icon={<Checkmark/>} />
			</Column>
			<Column>
				<Title>Disabled</Title>
				<Button disabled sort='circle' icon={<Checkmark/>} />
				<Button disabled sort='circle' small icon={<Checkmark/>} />
			</Column>
		</ButtonWrapper>
	);


	return Buttons;
};

export default CircleButtons;
