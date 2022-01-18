import { maybeValidTimestamp } from './abtest-iframes';


describe('maybeValidTimestamp', () => {

	const now_sec =  Math.floor((new Date).getTime() / 1000);

	it('should reject non-integer timestamp', () => {
		for (const timestamp of ['', 'a', '1a']) {
			expect(maybeValidTimestamp(`a|${timestamp}|hmac`)).toBe(false);
		}
	});

	it('should reject invalid signature', () => {
		for (const signature of ['', 'a|1']) {
			expect(maybeValidTimestamp(signature)).toBe(false);
		}
	});

	it('should reject stale timestamp', () => {
		expect(maybeValidTimestamp(`a|${now_sec - (30 * 60)}|hmac`)).toBe(false);
	});

	it('should recognize recent timestamp', () => {
		expect(maybeValidTimestamp(`a|${now_sec - 60}|hmac`)).toBe(true);
	});
});
