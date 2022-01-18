/* @flow */

import type { Validator } from './types';

export const email = (message?: string): Validator =>
	(value: string): ?string => {
		const emailRegex = (/^([\w.+-]+)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
		if (!emailRegex.test(value)) {
			return message || 'Value is not an email.';
		}
		return undefined;
	};

export const httpUrl = (message?: string): Validator =>
	(value: string): ?string => {
		const urlRegex = /^(((https?):\/\/)|www[.])(.+?\..+?)([.),]?)(\s|\.\s+|\)|$)/gi;
		if (!urlRegex.test(value)) {
			return message || 'Value is not a valid url.';
		}
		return undefined;
	};

export const kinjaVideoUrl = (message?: string): Validator =>
	(value: string): ?string => {
		const urlRegex = /^(?:https?:)?\/\/kinja\.com\/api\/videoupload\/video\/([0-9]+)?/gi;
		if (!urlRegex.test(value)) {
			return message || 'Value is not a valid Kinja video url.';
		}
		return undefined;
	};

export const doesntStartWithDash = (message?: string): Validator =>
	(value: string): ?string => {
		const inputRegex = (/^[^-]/);
		if (!inputRegex.test(value)) {
			return message || 'Value cannot start with dash.';
		}
		return;
	};



