/* @flow */

import type { Validator } from './types';

export const minLength = (amount: number, message?: string): Validator =>
	(value: string): ?string => {
		if (value.length < amount) {
			return message || 'Value too short.';
		}
		return undefined;
	};

export const maxLength = (amount: number, message?: string): Validator =>
	(value: string): ?string => {
		if (value.length > amount) {
			return message || 'Value too long.';
		}
		return undefined;
	};

export const length = (amount: number, message?: string): Validator =>
	(value: string): ?string => {
		if (value.length !== amount) {
			return message || `Value must be ${amount} characters long.`;
		}
		return undefined;
	};
