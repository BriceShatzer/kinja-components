/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';


const BasicButtons = ({
	small,
	fullwidth
}: {
	small: boolean,
	fullwidth: boolean
}) => {
	const label = small ? 'Small' : 'Regular';
	const props = {
		small,
		label,
		fullwidth
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
				<Button weight='primary' {...props} />
			</Column>
			<Column>
				<Title>Secondary</Title>
				<Button weight='secondary' {...props} />
			</Column>
			<Column>
				<Title>Tertiary</Title>
				<Button weight='tertiary' {...props} />
			</Column>
			<Column>
				<Title>Tertiary Dark</Title>
				<Button weight='tertiary-dark' {...props} />
			</Column>
			<Column>
				<Title>Disabled</Title>
				<Button disabled {...props} />
				<Button weight='secondary' disabled {...props} />
			</Column>
			<Column>
				<Title>Error</Title>
				<Button weight='secondary' variant="error" {...props} />
			</Column>
		</ButtonWrapper>
	);


	return Buttons;
};

export default BasicButtons;
