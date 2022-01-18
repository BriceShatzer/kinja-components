import React from 'react';
import { SubscribeContainer } from './index';
import { mount } from 'enzyme';

describe('Page layout/Subscribe container', () => {
	it('should render', () => {
		const component = mount(<SubscribeContainer />);

		expect(component).toMatchSnapshot();
	});
});
