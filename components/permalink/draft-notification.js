// @flow

import * as React from 'react';
import styled from 'styled-components';
import config from 'kinja-magma/config';

import type { Locale } from 'kinja-magma/models/Locale';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import { NotificationContainer } from 'kinja-components/components/elements/notification';
import createTranslate from 'kinja-components/components/translator';
import translations from './translations';
import DateTime from 'kinja-components/utils/DateTime';

// Draft notification container and translation
const DraftNotificationContainer = styled(NotificationContainer)`
	z-index: auto;
	padding: 16px 0;
	margin: 20px 0;
	justify-content: center;
	max-width: ${({ theme }) => theme.pageWidth};
`;

const DraftNotification = (props: { locale?: Locale, isScheduled: boolean, publishTime: number, timezone: string }) => {
	const { locale, publishTime, timezone, isScheduled } = props;
	const translate = createTranslate(translations, props.locale || config.defaultLocale);
	const datetime = new DateTime({ locale, timestamp: publishTime, timezone });
	const text = isScheduled ?
		translate('You are previewing a draft of this post. It is scheduled to go live at {time} on {date}.', {
			time: datetime.formatTime('h:mma ZZZZ'),
			date: datetime.formatTime('M/dd/yy')
		}) :
		translate('You are previewing a draft of this post.');

	return <EnsureDefaultTheme>
		<DraftNotificationContainer
			type='alert'
			fullWidth>
			{text}
		</DraftNotificationContainer>
	</EnsureDefaultTheme>;
};

export default DraftNotification;