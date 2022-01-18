/* @flow */

import { email, httpUrl } from './format';

const CUSTOM_ERROR_MESSAGE = 'Custom error message';

describe('Format validators', () => {
	it('email', () => {
		expect(email()('a@b.com')).toBeUndefined();
		expect(email(CUSTOM_ERROR_MESSAGE)('a@b.com')).toBeUndefined();
		expect(email()('a')).toEqual(expect.any(String));
		expect(email(CUSTOM_ERROR_MESSAGE)('a')).toEqual(CUSTOM_ERROR_MESSAGE);
	});
	it('httpUrl', () => {
		const shouldBeValid = 'http://www.kinja.com';
		const shouldBeInvalid = 'dub dub dub dot kinja dot biz';
		expect(httpUrl()(shouldBeValid)).toBeUndefined();
		expect(httpUrl(CUSTOM_ERROR_MESSAGE)(shouldBeValid)).toBeUndefined();
		expect(httpUrl()(shouldBeInvalid)).toEqual(expect.any(String));
		expect(httpUrl(CUSTOM_ERROR_MESSAGE)(shouldBeInvalid));
	});
});
