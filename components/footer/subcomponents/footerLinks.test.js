import * as React from 'react';
import { shallow } from 'enzyme';

import FooterLinks from './footerLinks';
import footerTranslations from '../footerTranslations';

import createTranslate from '../../translator';

describe('Localized <FooterLinks />', () => {
	const locales = ['en-US', 'es-ES'];
	const translate = createTranslate(footerTranslations);
	const props = {
		blogGroup: 'gizmodo',
		ga: jest.fn(),
		toggleStoreModal: jest.fn(),
		translate,
		enableSitemap: false
	};

	const staticTranslations = {
		'es-ES': 'Publicidad',
		'en-US': 'Advertising'
	};

	locales.forEach(locale => {
		it(`renders a localized link for ${locale}`, () => {
			const translate = createTranslate(footerTranslations, locale);

			const wrapper = shallow(<FooterLinks {...props} translate={translate} />);

			expect(wrapper.html()).toContain(staticTranslations[locale]);
		});
	});

	it('renders the about link if a blog has an aboutPostId', () => {
		const propsWithAbout = {
			...props,
			showAboutLink: true
		};
		const wrapper = shallow(<FooterLinks {...propsWithAbout} />);

		expect(wrapper.html()).toContain('About');
	});

	it('renders the store link if a blog has a display name', () => {
		const propsWithAbout = {
			...props,
			displayName: 'nice',
			enableStoreLink: true
		};
		const wrapper = shallow(<FooterLinks {...propsWithAbout} />);

		expect(wrapper.html()).toContain('Shop');
	});

	it('doesn\'t render the about link if a blog doesn\'t have an aboutPostId', () => {
		const wrapper = shallow(<FooterLinks {...props} />);

		expect(wrapper.html()).not.toContain('About');
	});
});
