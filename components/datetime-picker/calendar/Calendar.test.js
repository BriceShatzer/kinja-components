import * as React from 'react';
import { mount } from 'enzyme';

import Calendar, {
	CalendarDate,
	CalendarMonth
} from './Calendar';

import ArrowRightIcon from '../../icon19/ArrowRight';


describe('<Calendar />', () => {
	const handler = jest.fn();
	const todayTimemillisStub = 1548690786704; // 01/28/2019

	const stubElement = () => (
		<Calendar
			timemillis={todayTimemillisStub}
			onDateChange={handler}
		/>
	);

	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should switch month', () => {
		const wrapper = mount(stubElement());

		const nextMonthIcon = wrapper.find(ArrowRightIcon).at(0);
		nextMonthIcon.simulate('click');
		const monthName = wrapper.find(CalendarMonth).text();

		expect(monthName).toBe('February');
		handler.mockClear();
	});

	it('should call calback with timemillis when date has been changed', () => {
		const wrapper = mount(stubElement());

		const fifthOfJanuary = wrapper.find(CalendarDate).at(6);

		fifthOfJanuary.simulate('click');
		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith({
			day: 5,
			month: 1,
			year: 2019
		});
		handler.mockClear();
	});
});
