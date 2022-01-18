import {
	intersperse
} from './';

describe('Array utils', () => {
	describe('intersperse', () => {
		test('should intersperse a 0 after every element except the last', () => {
			expect(intersperse([1, 2, 3], 0)).toEqual([1, 0, 2, 0, 3]);
		});

		test('should return empty array when input is empty', () => {
			expect(intersperse([], 0)).toEqual([]);
		});

		test('should mix types', () => {
			expect(intersperse([1,2], ', ')).toEqual([1, ', ', 2]);
		});
	});
});
