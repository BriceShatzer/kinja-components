import React from 'react';
import { HorizontalAdContainer } from './index';
import { SplashyTop } from '../ad-slot/ads';
import { mount } from 'enzyme';

describe('Page layout/Horizontal ad container', () => {
	it('should render', () => {
		const component = mount(<HorizontalAdContainer />);

		expect(component).toMatchSnapshot();
	});

	it('should render with an ad', () => {
		const component = mount(<HorizontalAdContainer desktopAd={<SplashyTop/>} />);

		expect(component).toMatchSnapshot();
	});
});
