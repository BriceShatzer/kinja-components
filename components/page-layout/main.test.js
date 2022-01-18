import React from 'react';
import { Main } from './index';
import { mount } from 'enzyme';

describe('Page layout/Main', () => {
	it('should render', () => {
		const component = mount(<Main/>);

		expect(component).toMatchSnapshot();
	});
});
