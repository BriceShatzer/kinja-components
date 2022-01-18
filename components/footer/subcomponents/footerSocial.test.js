/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import FooterSocial from './footerSocial';

describe('<FooterSocial />', () => {
	it('renders links to social media that have values', () => {
		const socialProps = {
			canonicalHost: 'hi',
			facebookScreenName: 'ho',
			instagramScreenName: null,
			twitterScreenName: 'lets',
			youtubeUrl: 'go'
		};

		const stubbedProps = {
			...socialProps,
			ga: jest.fn()
		};

		const wrapper = mount(<FooterSocial {...stubbedProps} />);

		expect(wrapper).toMatchSnapshot();
	});
});
