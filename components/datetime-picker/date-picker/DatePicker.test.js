import * as React from 'react';
import { mount, shallow } from 'enzyme';

import DatePicker, { Container } from './DatePicker';
import { CalendarDate } from '../calendar/Calendar';


describe('<DatePicker />', () => {
	const handler = jest.fn();
	const todayTimemillisStub = 1549966749571; // 02/12/2019

	const stubElement = () => (
		<DatePicker
			timemillis={todayTimemillisStub}
			onDateChange={handler}
		/>
	);

	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should open / close the Calendar', () => {
		const wrapper = mount(stubElement());
		const container = wrapper.find(Container);
		container.simulate('click');

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.exists('Calendar')).toBe(true);

		wrapper.setProps({ isOpen: false });
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.exists('Calendar')).toBe(false);
		handler.mockClear();
	});

	it('should update input / call onDateChange', () => {
		const wrapper = mount(stubElement());
		const container = wrapper.find(Container);
		container.simulate('click');

		const calendarDay = wrapper.find(CalendarDate).at(6); // February 2
		calendarDay.simulate('click');

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith({ day: 2, month: 2, year: 2019 });

		const input = wrapper.find('Textfield18');
		expect(input.props().value).toBe('02/02/2019');
		handler.mockClear();
	});

	it('should not change date value', () => {
		const wrapper = shallow(stubElement());
		const instance = wrapper.dive().dive().instance();
		instance.onFocus();
		instance.onChange('green muffins');
		instance.onBlur();

		expect(instance.state).toEqual({
			isActive: false,
			timemillis: 1549966749571,
			day: 12,
			month: 2,
			year: 2019,
			customValue: '02/12/2019'
		});
	});

	it('should change date to the manually set value', () => {
		const wrapper = shallow(stubElement());
		const instance = wrapper.dive().dive().instance();
		instance.onFocus();
		instance.onChange('1.19.2020');
		instance.onBlur();

		expect(instance.state).toEqual({
			isActive: false,
			timemillis: 1579410000000,
			day: 19,
			month: 1,
			year: 2020,
			customValue: '01/19/2020'
		});
	});
});