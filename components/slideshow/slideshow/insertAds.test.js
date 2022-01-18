import insertAds from './insertAds';

describe('Slideshow', () => {
	describe('Insert Ad helper', () => {
		it('should insert an ad at a given frequency', () => {
			const array = [0, 1, 2, 3, 4, 5];
			const result = insertAds(array, 2);
			expect(result).toMatchSnapshot();
		});
	});
});
