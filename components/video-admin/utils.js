// @flow

import { DateTime as DT, Duration } from 'luxon';
import DateTime from '../../utils/DateTime';

export const getTimestamp = (publishedTime: string, locale?: string): string => {
	const timestamp = DT
		.fromISO(publishedTime)
		.toMillis();
	const isToday = (day: number, month: number, year: number): boolean => {
		const today = new Date();
		if (day === today.getDate() &&
			month === (today.getMonth() + 1) &&
			year === today.getFullYear()
		) {
			return true;
		}

		return false;
	};

	const dateTime = new DateTime({ timestamp, locale });
	const { day, month, year } = dateTime.formattedTime.date;

	if (isToday(day, month, year)) {
		return `Today ${dateTime.formattedTime.hmma}`;
	}

	return dateTime.fullDateTime;
};

export const getDuration = (duration: number): string => Duration
	.fromObject({ seconds: duration })
	.normalize()
	.toFormat('m:ss');
