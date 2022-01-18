/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import Heart from '../icon19/Heart';


const BasicButtonsIcon = ({
	labelPosition,
	small,
	fullwidth,
	withLabel
}: {
	labelPosition: 'before' | 'after',
	small: boolean,
	fullwidth: boolean,
	withLabel: boolean
}) => {
	const label = small ? 'Small' : 'Regular';
	const props = {
		addMargin: true,
		small,
		label: withLabel ? label : '',
		fullwidth,
		labelPosition
	};

	const ButtonWrapper = styled.div`
		display: flex;
		flex-direction: ${fullwidth ? 'column' : 'row'};
		justify-content: space-between;
	`;

	const Column = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
		width: ${fullwidth ? '700px' : 'auto'};
		padding: 0 15px;
		margin-bottom: ${fullwidth ? '20px' : '0'};

		/* to have top margin between button with same style, but different weight */
		[class*="ButtonWrapper"] + [class*="ButtonWrapper"] {
			margin-top: 20px;
		}
	`;

	const Title = styled.h2`
		margin-bottom: ${fullwidth ? '0' : '1rem'};
	`;

	const Buttons = (
		<ButtonWrapper>
			<Column>
				<Title>Primary</Title>
				<Button weight='primary' icon={<Heart/>} {...props} />
			</Column>
			<Column>
				<Title>Secondary</Title>
				<Button weight='secondary' icon={<Heart/>} {...props} />
			</Column>
			<Column>
				<Title>Tertiary</Title>
				<Button weight='tertiary' icon={<Heart/>} {...props} />
			</Column>
			<Column>
				<Title>Disabled</Title>
				<Button disabled icon={<Heart/>} {...props} />
				<Button weight='secondary' disabled icon={<Heart/>} {...props} />
			</Column>
			<Column>
				<Title>Error</Title>
				<Button weight='secondary' variant='error' icon={<Heart/>} {...props} />
			</Column>
		</ButtonWrapper>
	);
	return Buttons;
};

export default BasicButtonsIcon;
