import * as React from 'react';
import { mount } from 'enzyme';

import Tabs from './tabs';


describe('<Tabs />', () => {
	it('should render properly', () => {
		const wrapper = mount(
			<Tabs />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
