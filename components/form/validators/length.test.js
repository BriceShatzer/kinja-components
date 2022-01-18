import { minLength, maxLength, length } from './length';

const CUSTOM_ERROR_MESSAGE = 'Custom error message';

describe('Length validators', () => {
	it('minLength', () => {
		expect(minLength(3)('abc')).toBeUndefined();
		expect(minLength(3, CUSTOM_ERROR_MESSAGE)('abc')).toBeUndefined();
		expect(minLength(10)('abc')).toEqual(expect.any(String));
		expect(minLength(10, CUSTOM_ERROR_MESSAGE)('abc')).toEqual(CUSTOM_ERROR_MESSAGE);
	});

	it('maxLength', () => {
		expect(maxLength(10)('abc')).toBeUndefined();
		expect(maxLength(10, CUSTOM_ERROR_MESSAGE)('abc')).toBeUndefined();
		expect(maxLength(3)('abcd')).toEqual(expect.any(String));
		expect(maxLength(3, CUSTOM_ERROR_MESSAGE)('abcd')).toEqual(CUSTOM_ERROR_MESSAGE);
	});

	it('length', () => {
		expect(length(3)('abc')).toBeUndefined();
		expect(length(3, CUSTOM_ERROR_MESSAGE)('abc')).toBeUndefined();
		expect(length(10)('abc')).toEqual(expect.any(String));
		expect(length(10, CUSTOM_ERROR_MESSAGE)('abc')).toEqual(CUSTOM_ERROR_MESSAGE);
		expect(length(1)('abc')).toEqual(expect.any(String));
		expect(length(1, CUSTOM_ERROR_MESSAGE)('abc')).toEqual(CUSTOM_ERROR_MESSAGE);
	});
});
