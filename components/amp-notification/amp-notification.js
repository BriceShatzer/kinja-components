// @flow

import * as React from 'react';
import styled from 'styled-components';

import Close from '../icon19/Close';

const MessageBox = styled.div`
	background-color: ${props => props.theme.color.alert};
	color: ${props => props.theme.color.whitesmoke};
	padding: 1em 3em 1em 1em;
	font-family: ${props => props.theme.typography.headline.fontFamily};

	a {
		color: ${props => props.theme.color.white};
		text-decoration: underline;
	}
`;

const CloseButtonContainer = styled.div`
	position: absolute;
	top: 18px;
	right: 18px;
	z-index: 1;
	cursor: pointer;
`;


const AmpNotification = ({children}: {
	children: React.Node
}) => {
	return (
		<amp-user-notification layout="nodisplay" id="amp-privacypolicy-notification">
			<MessageBox>
				{children}
				<CloseButtonContainer>
					<a on="tap:amp-privacypolicy-notification.dismiss">
						<Close/>
					</a>
				</CloseButtonContainer>
			</MessageBox>
		</amp-user-notification>
	);
};

export default AmpNotification;
