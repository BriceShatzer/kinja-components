import {
	capitalizeString,
	extendedLatinToASCII,
	identity,
	stripHTML,
	truncateStringBy
} from './';

describe('String utils', () => {
	describe('truncateStringBy', () => {
		const EMPTY_STRING = '';
		const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		const ELLIPSIS = '…';

		it('is idempotent', () => {
			expect(truncateStringBy(EMPTY_STRING)).toEqual(EMPTY_STRING);
			expect(truncateStringBy(ALPHABET)).toEqual(ALPHABET);
		});

		it('truncates the alphabet by 10 characters with ellipsis', () => {
			expect(truncateStringBy(ALPHABET, 10)).toEqual(ALPHABET.substr(0, 10) + ELLIPSIS);
		});

		it('truncates the alphabet by 10 characters without ellipsis', () => {
			expect(truncateStringBy(ALPHABET, 10, false)).toEqual(ALPHABET.substr(0, 10));
		});
	});

	describe('stripHTML', () => {
		const HTML = '<div><img src="" title="a"><span>hello world</span></div>';
		const TEXT = 'hello world';

		it('is idempotent', () => {
			expect(stripHTML(TEXT)).toEqual(TEXT);
		});

		it('transforms <span>hello</span> to `hello`', () => {
			expect(stripHTML(HTML)).toEqual(TEXT);
		});
	});

	describe('stripHTMLWithRegex', () => {
		const HTML = '<div><img src="" title="a"><span>hello world, posse</span></div>';
		const TEXT = 'hello world, posse';

		it('is idempotent', () => {
			expect(stripHTML(TEXT)).toEqual(TEXT);
		});

		it('transforms <span>hello</span> to `hello`', () => {
			expect(stripHTML(HTML)).toEqual(TEXT);
		});
	});

	describe('capitalizeString', () => {
		const UPPER = ['Photo', 'Éspanol'];
		const LOWER = ['photo', 'éspanol'];

		it('is idempotent', () => {
			expect(capitalizeString(UPPER[0])).toEqual(UPPER[0]);
			expect(capitalizeString(UPPER[1])).toEqual(UPPER[1]);
		});

		it('transforms `photo` into `Photo`', () => {
			expect(capitalizeString(LOWER[0])).toEqual(UPPER[0]);
		});

		it('transforms `éspanol` into `Éspanol`', () => {
			expect(capitalizeString(LOWER[1])).toEqual(UPPER[1]);
		});
	});

	describe('identity', () => {
		it('is a function', () => {
			expect(identity instanceof Function).toBeTruthy();
		});

		it('is idempotent', () => {
			expect(identity()).toBeUndefined();
			expect(identity(identity)).toEqual(identity);
			expect(identity('hello')).toEqual('hello');
		});
	});
	describe('extendedLatinToASCII', () => {
		const testWords = [
			'garçonnière', // Latin-1 Supplement (English/French)
			'stříbrný', // Latin Extended-A (Czech)
			'Yǒng', // Latin Extended-B (Chinese, Pinyin)
			'Предложения', // uses characters above conversion range (Russian, Cyrillic)
			'hippopotamus' // uses characters below conversion range (English, Basic Latin)
		];
		const convertedWords = ['garconniere', 'stribrny', 'Yong', testWords[3], testWords[4]];

		it('is a function', () => {
			expect(extendedLatinToASCII instanceof Function).toBeTruthy();
		});

		it('is idempotent', () => {
			expect(extendedLatinToASCII(convertedWords[0])).toEqual(convertedWords[0]);
			expect(extendedLatinToASCII(convertedWords[1])).toEqual(convertedWords[1]);
			expect(extendedLatinToASCII(convertedWords[2])).toEqual(convertedWords[2]);
			expect(extendedLatinToASCII(convertedWords[3])).toEqual(convertedWords[3]);
			expect(extendedLatinToASCII(convertedWords[4])).toEqual(convertedWords[4]);
		});

		it('transforms characters from the Latin-1 Supplement range ', () => {
			expect(extendedLatinToASCII(testWords[0])).toEqual(convertedWords[0]);
		});

		it('transforms characters from the Latin Extended-A range ', () => {
			expect(extendedLatinToASCII(testWords[1])).toEqual(convertedWords[1]);
		});

		it('transforms characters from the Latin Extended-B range ', () => {
			expect(extendedLatinToASCII(testWords[2])).toEqual(convertedWords[2]);
		});

		it('makes no changes to characters above U+02FF', () => {
			expect(extendedLatinToASCII(testWords[3])).toEqual(convertedWords[3]);
		});

		it('makes no changes to characters below U+007E', () => {
			expect(extendedLatinToASCII(testWords[4])).toEqual(convertedWords[4]);
		});
	});

});
