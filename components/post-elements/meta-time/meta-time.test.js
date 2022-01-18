import * as React from 'react';
import { mount } from 'enzyme';

import MetaTime from './meta-time';


describe('<MetaTime />', () => {
	it('should render properly', () => {
		const millis = 1141508126849;
		const timezone = 'Europe/Budapest';
		const wrapper = mount(<MetaTime millis={millis} timezone={timezone}/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render scheduled style', () => {
		const millis = 1141508126849;
		const timezone = 'Europe/Budapest';
		const wrapper = mount(<MetaTime millis={millis} timezone={timezone} isScheduled />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should have the data attribute used for kala tracking on the link when scheduled', () => {
		const millis = 1141508126849;
		const timezone = 'Europe/Budapest';
		const wrapper = mount(<MetaTime millis={millis} timezone={timezone} postId={424242} pageType={'frontpage'} isScheduled />);

		expect(wrapper.find('Link')).toMatchSnapshot();
	});

	it('should have the data attribute used for kala tracking on the link when not scheduled', () => {
		const millis = 1141508126849;
		const timezone = 'Europe/Budapest';
		const wrapper = mount(<MetaTime millis={millis} timezone={timezone} postId={424242} pageType={'frontpage'} />);

		expect(wrapper.find('Link')).toMatchSnapshot();
	});
});
