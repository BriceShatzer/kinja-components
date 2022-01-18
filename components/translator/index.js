/* @flow */
import type { Locale } from 'kinja-magma/models/Locale';
import format from 'string-template';
import Logger from 'kinja-magma/utils/logger';
import config from 'kinja-magma/config';

const logger = new Logger('kinja:i18n');

export type Messages = {
	[Locale]: {
		[string]: string
	}
};
export type TranslateFunction = (id: string, values?: { [string]: mixed }) => string;

const supportedLocales = Object.values(config.locales);
const isLocaleSupported = locale => supportedLocales.includes(locale);

export default function createTranslate(messages?: Messages = {}, locale?: Locale = config.locales.en) {
	return function translate(id: string, values?: { [string]: mixed } = {}): string {
		if (locale === config.locales.en || !isLocaleSupported(locale)) {
			return format(id, values);
		}
		if (!messages[locale]) {
			logger.warning(`Missing translation for "${id}" with locale "${locale}"`);
			return format(id, values);
		}
		return messages[locale][id] ? format(messages[locale][id], values) : format(id, values);
	};
}
