import * as React from 'react';
import { mount } from 'enzyme';

import AMPMSwitcher, { TextBox } from './AMPMSwitcher';


describe('<AMPMSwitcher />', () => {
	const handler = jest.fn();
	const todayTimemillisStub = 1549966749571; // 02/12/2019

	const stubElement = () => (
		<AMPMSwitcher
			timemillis={todayTimemillisStub}
			onChange={handler}
		/>
	);

	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it.skip('should call onChange', () => {
		const wrapper = mount(stubElement());

		const textbox = wrapper.find(TextBox);
		textbox.simulate('click');

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith('pm');
		handler.mockClear();
	});
});
