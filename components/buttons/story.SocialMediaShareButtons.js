/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';
import FacebookIcon from '../icon19/Facebook';
import TwitterIcon from '../icon19/Twitter';


const SocialMediaShareButtons = () => {
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
					sort='share'
					label='Share'
					labelPosition='after'
					variant='facebook'
				/>
				<Button
					color='twitter'
					icon={<TwitterIcon />}
					sort='share'
					label='Tweet'
					labelPosition='after'
					variant='twitter'
				/>
			</Column>
		</ButtonWrapper>
	);

	return Buttons;
};

export default SocialMediaShareButtons;
