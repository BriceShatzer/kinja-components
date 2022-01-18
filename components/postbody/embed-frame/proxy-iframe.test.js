import {
	getUnproxiedPath,
	iframeSrcWithThumb,
	proxyIframe,
	proxyIframes,
	pathWhitelist
} from './proxy-iframe';

describe('Iframe proxying utils', () => {
	describe('proxyIframe', () => {
		it('should keep non-proxyed paths untouched', () => {
			expect(getUnproxiedPath('https://google.com')).toBe('https://google.com');
		});
		it('should get the unproxied path', () => {
			expect(getUnproxiedPath('/proxy/iframe?url=https%3A%2F%2Ftest.com%3Fparam%3Don&imageId=zhxqs1hhlflked7raena&imageExt=jpg'))
				.toBe('https://test.com?param=on');
		});
	});
	describe('iframeSrcWithThumb', () => {
		it('should add thumb params to url', () => {
			expect(iframeSrcWithThumb('https://google.com/?foo=bar', { id: 'id', format: 'jpg' }))
				.toBe('https://google.com/?foo=bar&imageExt=jpg&imageId=id');
		});
		it('should replace imageId and imageExt if they exitst', () => {
			expect(iframeSrcWithThumb('https://google.com/?foo=bar&imageId=notid&imageExt=gif', { id: 'id', format: 'jpg' }))
				.toBe('https://google.com/?foo=bar&imageExt=jpg&imageId=id');
		});
	});
	describe('proxyIframe', () => {
		let iframe;
		beforeEach(() => {
			iframe = document.createElement('iframe');
		});
		pathWhitelist.forEach(whitelistedPath => {
			it(`should leave sources with ${whitelistedPath} untouched`, () => {
				const src = whitelistedPath + 'foo';
				iframe.src = src;
				proxyIframe(iframe);
				expect(iframe.src).toBe(`http://localhost${src}`);
			});
		});
		it('should proxy an insecure iframe', () => {
			iframe.src = 'http://google.com';
			proxyIframe(iframe);
			expect(iframe).toMatchSnapshot();
		});
		it('should proxy a secure iframe', () => {
			iframe.src = 'https://google.com';
			proxyIframe(iframe);
			expect(iframe).toMatchSnapshot();
		});
		it('should append thumbnail information', () => {
			iframe.src = 'https://google.com';
			proxyIframe(iframe, { id: 'id', format: 'jpg' });
			expect(iframe.src).toBe('http://localhost/proxy/iframe?imageExt=jpg&imageId=id&url=https%3A%2F%2Fgoogle.com');
		});
	});
	it('proxyIframes', () => {
		const div = document.createElement('div');
		const iframe1 = document.createElement('iframe');
		iframe1.src = 'https://google.com';
		const iframe2 = document.createElement('iframe');
		iframe2.src = 'http://index.hu';
		div.appendChild(iframe1);
		div.appendChild(iframe2);
		proxyIframes(div);
		expect(div).toMatchSnapshot();
	});
});
