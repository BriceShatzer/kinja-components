// @flow

import * as React from 'react';
import styled from 'styled-components';
import media from '../../style-utils/media';

const NotificationContainer = styled.div`
	position: relative;
`;

const Message = styled.div`
	font-size: 16px;
	line-height: 21px;
	margin-bottom: 16px;
	padding: 16px 44px 16px 16px;
	position: relative;
	background-color: #e5e5e5;

	${media.largeUp`
		margin-bottom: 24px;
	`}

	a {
		color: ${p => p.theme.color.primary};
	}
`;

export default function KinjaNotification() {
	return (
		<NotificationContainer>
			<Message>
				<p>
					Dear Kinja User,
				</p>
				<p>
					Based on feedback, G/O Media is reevaluating the options for maintaining Kinja user pages and they will remain accessible at this time.
				</p>
				<p>
					Sincerely,<br />
					G/O Media
				</p>
			</Message>
		</NotificationContainer>
	);
}
