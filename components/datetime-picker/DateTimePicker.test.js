import * as React from 'react';
import { mount } from 'enzyme';

import DateTimePicker from './DateTimePicker';
import { CalendarDate } from './calendar/Calendar';


describe('<DateTimePicker />', () => {
	const handler = jest.fn();
	const todayTimemillisStub = 1549966749571; // 02/12/2019

	const stubElement = ({ timemillis = todayTimemillisStub } = {}) => (
		<DateTimePicker
			timemillis={timemillis}
			onDateChange={handler}
		/>
	);

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => todayTimemillisStub);
	});

	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should call onDateChange', () => {
		const wrapper = mount(stubElement());
		wrapper.find('DatePicker').simulate('click');

		const hour = wrapper.find(CalendarDate).at(7); // February 3
		hour.simulate('click');

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith(1549189140000);

		handler.mockClear();
	});

	it('should reset date', () => {
		const wrapper = mount(stubElement({ timemillis: 1549148400000 })); // February 3
		wrapper.find('ReloadIcon').simulate('click');

		const inputDate = wrapper.find('Textfield18').at(0);
		const inputTime = wrapper.find('Textfield18').at(1);

		expect(inputDate.props().value).toBe('02/12/2019');
		expect(inputTime.props().value).toBe('5:19');
	});
});
