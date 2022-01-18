// @flow

import { DateTime as DT } from 'luxon';
import FormattedTime from 'kinja-magma/models/FormattedTime';
import type { Locale } from 'kinja-magma/models/Locale';
import config from 'kinja-magma/config';
import createTranslate from '../../components/translator';
import type { TranslateFunction } from '../../components/translator';
import translations from './translations';

export type DateTimeProperties = {
	timestamp: number;
	timezone?: string;
	locale?: Locale;
}

export default class DateTime {
	formattedTime: FormattedTime;
	translate: TranslateFunction;

	constructor(props: DateTimeProperties) {
		this.formattedTime = FormattedTime.fromJSON({
			timestamp: props.timestamp,
			timezone: props.timezone,
			locale: props.locale
		});

		this.translate = createTranslate(translations, props.locale);
	}

	formatTime(format: string): string {
		return this.formattedTime.formatTime(format);
	}

	/**
	 * Example: 3/07/14 12:58pm
	 */
	get fullDateTime(): string {
		return this.formattedTime.Mddyyhmma;
	}

	/**
	 * Example: 2014-03-07T12:58:49+01:00
	 */
	get machineDateTime(): string {
		return this.formattedTime.yMdHmsZ;
	}

	/**
	 * Example: 12:58pm
	 */
	get time(): string {
		return this.formattedTime.hmma;
	}

	/**
	 * Example: Friday
	 */
	get day(): string {
		return this.formattedTime.day;
	}

	/**
	 * Translated relative time
	 */
	get relativeDateTime(): ?string {
		const { amount, type } = this.formattedTime.relative;
		const value = Number(amount);

		switch (type) {
			case 'future': return this.fullDateTime;
			case 'now': return this.translate('Just now');
			case 'minutes':
				if (value >= 2) {
					return this.translate('{count} minutes ago', { count: value });
				}
				return this.translate('A minute ago');
			case 'hours':
				if (value >= 2) {
					return this.translate('{count} hours ago', { count: value });
				}
				return this.translate('An hour ago');
			case 'today': return this.translate('Today {hmma}', { hmma: this.time });
			case 'yesterday': return this.translate('Yesterday {hmma}', { hmma: this.time });
			case 'pastweek': return this.translate('{day} {hmma}', { hmma: this.time, day: this.day });
			case 'greaterthanweek': return this.fullDateTime;
			default:
				return null;
		}
	}

	/**
	 * A shorter, translated relative time
	 */
	get relativeDateTimeShort(): ?string {
		const { amount, type } = this.formattedTime.relative;
		const value = Number(amount);

		switch (type) {
			case 'future': return this.fullDateTime;
			case 'now': return this.translate('Just now');
			case 'minutes':
				if (value >= 2) {
					return this.translate('{count} min ago', { count: value });
				}
				return this.translate('1 min ago');
			case 'hours':
				if (value >= 2) {
					return this.translate('{count} hrs ago', { count: value });
				}
				return this.translate('1 hr ago');
			case 'today': return this.formattedTime.date.toLocaleString(DT.TIME_SIMPLE);
			case 'yesterday':
			case 'pastweek':
			case 'greaterthanweek': return this.formattedTime.date.toLocaleString({...DT.DATE_SHORT, year: '2-digit' });
			default:
				return null;
		}
	}

	get getBackendFormattedDate(): string {
		return this.formatTime(config.backendDateFormat);
	}

	static getTimestampFromBackendDate(backendDate: string): number {
		return DT.fromFormat(backendDate, config.backendDateFormat).toMillis();
	}
}
