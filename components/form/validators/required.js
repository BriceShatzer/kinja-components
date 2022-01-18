/* @flow */

import type { Validator } from './types';

export const required = (message?: string): Validator =>
	(value: string): ?string => value ? undefined : (message || 'Required');
