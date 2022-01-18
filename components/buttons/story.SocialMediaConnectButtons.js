/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import FacebookIcon from '../icon19/Facebook';
import TwitterIcon from '../icon19/Twitter';
import GoogleIcon from '../icon19/Google';
import BurnerIcon from '../icon19/Burner';


const SocialMediaConnectButtons = () => {
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

	const Buttons = (
		<ButtonWrapper>
			<Column>
				<Button
					icon={<FacebookIcon />}
					sort='social'
					label='Connect with Facebook'
					labelPosition='after'
					variant='facebook'
					weight='primary'
				/>
				<Button
					icon={<GoogleIcon />}
					sort='social'
					label='Connect with Google'
					labelPosition='after'
					variant='google'
					weight='primary'
				/>
				<Button
					icon={<TwitterIcon />}
					sort='social'
					label='Connect with Twitter'
					labelPosition='after'
					variant='twitter'
					weight='primary'
				/>
				<Button
					icon={<BurnerIcon />}
					sort='social'
					label='Create a burner account'
					labelPosition='after'
					weight='primary'
				/>
			</Column>
		</ButtonWrapper>
	);

	return Buttons;
};

export default SocialMediaConnectButtons;
