import createTranslate from './index';

const noTranslations = {
	'es-ES': {}
};

const translations = {
	'es-ES': {
		'Hello, {name}': 'Hola, {name}'
	}
};

describe('Translator', () => {
	it('returns the given string by default', () => {
		const translate = createTranslate(translations, 'en-US');
		expect(translate('Hello')).toBe('Hello');
		expect(translate('Hello, {name}', { name: 'Jest' })).toBe('Hello, Jest');
		expect(translate('Hello, {name}, it\'s {time} o\'clock', { name: 'Jest', time: 4 })).toBe('Hello, Jest, it\'s 4 o\'clock');
	});
	it('works if you specify no locale', () => {
		const translate = createTranslate(translations);
		expect(translate('Hello, {name}', { name: 'Jest' })).toBe('Hello, Jest');
	});
	it('works if you provide no translations', () => {
		const translate = createTranslate();
		expect(translate('Hello, {name}', { name: 'Jest' })).toBe('Hello, Jest');
	});
	it('translates message if you provide translations', () => {
		const translate = createTranslate(translations, 'es-ES');
		expect(translate('Hello, {name}', { name: 'Jest' })).toBe('Hola, Jest');
	});
	it('falls back to english if you provide a bad locale', () => {
		const translate = createTranslate(translations, 'es');
		expect(translate('Hello, {name}', { name: 'Jest' })).toBe('Hello, Jest');
	});
	it('falls back to the english translation if the given string is not available in translations', () => {
		const translate = createTranslate(noTranslations, 'es-ES');
		expect(translate('Hello, {name}', { name: 'Jest' })).toBe('Hello, Jest');
	});
});
