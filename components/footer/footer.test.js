import * as React from 'react';
import { shallow } from 'enzyme';

import { Footer } from './footer';

describe('<Footer />', () => {
	const blog = {
		aboutPostId: '',
		blogGroup: '',
		canonicalHost: '',
		displayName: 'display name',
		facebookScreenName: '',
		id: '',
		instagramScreenName: '',
		isCommerce: false,
		isGmgBlog: false,
		language: '',
		locale: '',
		name: 'test',
		parentId: '',
		properties: {
			aboutPostId: ''
		},
		timezone: '',
		twitterScreenName: '',
		youtubeUrl: ''
	};

	const stubbedProps = {
		ga: jest.fn(),
		isPermalink: false,
		showFooterLogo: false
	};

	test('should render generic footer w/o blog', () => {
		const wrapper = shallow(<Footer { ...stubbedProps } />);

		expect(wrapper).toMatchSnapshot();
	});

	test('should render blog footer w/ blog', () => {
		const wrapper = shallow(<Footer { ...stubbedProps } blog={ blog } />);

		expect(wrapper).toMatchSnapshot();
	});

	test('should not show footer logo by default', () => {
		const wrapper = shallow(<Footer { ...stubbedProps } blog={ blog } />);

		expect(wrapper.find('FooterLogo').exists()).toBe(false);
	});

	test('should render placeholder when lazy loading enabled', () => {
		const wrapper = shallow(<Footer { ...stubbedProps } blog={ blog } showFooterLogo />);

		expect(wrapper.find('FooterWrap')).toMatchSnapshot();
	});
});
