/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';


const CommerceButtons = ({
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
				<Title>Commerce</Title>
				<Button variant="commerce" {...props} />
				<Button weight='secondary' variant="commerce" {...props} />
			</Column>
			<Column>
				<Title>Amazon</Title>
				<Button variant="amazon" {...props} />
			</Column>
		</ButtonWrapper>
	);
	return Buttons;
};

export default CommerceButtons;
