import React from 'react';
import { Page } from './index';
import { mount } from 'enzyme';

describe('Page layout/Page', () => {
	it('should render', () => {
		const component = mount(<Page/>);

		expect(component).toMatchSnapshot();
	});
});
