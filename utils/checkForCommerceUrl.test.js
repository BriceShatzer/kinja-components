import checkForCommerceUrl from './checkForCommerceUrl';

describe('Check for commerce urls', () => {
	it('should modify commerce urls', () => {
		const url =  checkForCommerceUrl('https://deals.kinja.com/all-the-best-deals-1822529788#i_am_a_fragment_identifier', 'youmayalsolike');

		expect(url).toBe('https://deals.kinja.com/all-the-best-deals-1822529788?ks=youmayalsolike#i_am_a_fragment_identifier');
	});

	it('should not modify not commerce urls', () => {
		const url =  checkForCommerceUrl('https://kinja.com/all-the-best-deals-1822529788', 'youmayalsolike');

		expect(url).toBe('https://kinja.com/all-the-best-deals-1822529788');
	});
});
