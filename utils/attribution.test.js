import {
	isEmptyAttribution
} from './';

describe('Attribution utils', () => {
	describe('isEmptyAttribution', () => {
		const attributionData = [{
			label: '',
			credit: '',
			source: ''
		}];

		it('is returns a boolean', () => {
			expect(isEmptyAttribution(attributionData)).toEqual(true);
		});
	});
});
