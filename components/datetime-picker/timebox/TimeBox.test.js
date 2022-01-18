import * as React from 'react';
import { mount } from 'enzyme';

import TimeBox, { Time, SelectedTime } from './TimeBox';


describe('<TimeBox />', () => {
	const handler = jest.fn();
	const todayTimemillisStub = 1548943757728; // 01/31/2019 15:09
	const timezone = 'America/New_York';

	const stubElement = () => (
		<TimeBox
			timemillis={todayTimemillisStub}
			timezone={timezone}
			onTimeChange={handler}
		/>
	);

	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should render minutes to the closest multiple of 5', () => {
		const wrapper = mount(stubElement());
		const defaultSelectedMinute = wrapper.find(SelectedTime).at(1).text();

		expect(defaultSelectedMinute).toEqual(':10');
	});

	it('should call calback with timemillis when hour has been changed', () => {
		const wrapper = mount(stubElement());

		const oneHour = wrapper.find(Time).at(0); // 1

		oneHour.simulate('click');
		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith({ hour: 1, minute: 10 });
		handler.mockClear();
	});

	it('should call calback with timemillis when minute has been changed', () => {
		const wrapper = mount(stubElement());

		const tenMinute = wrapper.find(Time).at(14); // :20

		tenMinute.simulate('click');
		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith({ hour: 9, minute: 20 });
		handler.mockClear();
	});
});