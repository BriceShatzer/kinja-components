import { replaceQueryStringParamValue, fullyQualifyWithProtocol } from './url';

describe('replaceQueryStringParamValue', () => {

	it('should add the query string paramter if missing', () => {
		const url =  replaceQueryStringParamValue(
			'https://dot.com/path',
			'param',
			'foo'
		);
		expect(url).toBe('https://dot.com/path?param=foo');
	});

	it('should replace the query string parameter if present', () => {
		const url =  replaceQueryStringParamValue(
			'https://dot.com/path?param=foo',
			'param',
			'bar'
		);
		expect(url).toBe('https://dot.com/path?param=bar');
	});

	it('should work with multiple params and fragment identifiers', () => {
		const url =  replaceQueryStringParamValue(
			'https://dot.com/path?param1=foo&param3=baz#i_am_your_fragment_identifier_luke',
			'param2',
			'bar'
		);
		expect(url).toBe('https://dot.com/path?param1=foo&param2=bar&param3=baz#i_am_your_fragment_identifier_luke');
	});
});

describe('fullyQualifyWithProtocol', () => {
	let url;
	it('should turn a fully qualified domain to one with a protocol prefix if undefined', () => {
		url = fullyQualifyWithProtocol('www.avclub.com');
		expect(url).toBe('https://www.avclub.com');
		url = fullyQualifyWithProtocol('https://www.avclub.com');
		expect(url).toBe('https://www.avclub.com');
		url = fullyQualifyWithProtocol('http://www.avclub.com');
		expect(url).toBe('https://www.avclub.com');
		url = fullyQualifyWithProtocol('http://avclub.com');
		expect(url).toBe('https://avclub.com');
	});
});
