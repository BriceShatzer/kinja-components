import * as React from 'react';
import { mount, shallow } from 'enzyme';

import TimePicker from './TimePicker';
import { Time } from '../timebox/TimeBox';


describe('<TimePicker />', () => {
	const handler = jest.fn();
	const todayTimemillisStub = 1549966749571; // 02/12/2019

	const stubElement = () => (
		<TimePicker
			timemillis={todayTimemillisStub}
			onTimeChange={handler}
		/>
	);

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => todayTimemillisStub);
	});

	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should open / close the TimeBox', () => {
		const wrapper = mount(stubElement());
		wrapper.setProps({ isOpen: true });

		expect(wrapper).toMatchSnapshot();
		expect(wrapper.exists('TimeBox')).toBe(true);

		wrapper.setProps({ isOpen: false });
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.exists('TimeBox')).toBe(false);
		handler.mockClear();
	});

	it('should update input / call onTimeChange', () => {
		const wrapper = mount(stubElement());
		wrapper.setProps({ isOpen: true });

		const hour = wrapper.find(Time).at(2); // 3 (hour)
		hour.simulate('click');

		expect(handler).toHaveBeenCalledTimes(1);
		expect(handler).toHaveBeenCalledWith({ hour: 3, minute: 20, meridiem: 'am' });

		const input = wrapper.find('Textfield18');
		expect(input.props().value).toBe('3:20');
		handler.mockClear();
	});

	it('should not change time value', () => {
		const wrapper = shallow(stubElement());
		const instance = wrapper.dive().dive().instance();
		instance.onFocus();
		instance.onChange('green muffins');
		instance.onBlur();

		expect(instance.state).toEqual({
			isActive: false,
			customValue: '5:19',
			hour: 5,
			minute: 19,
			meridiem: 'am',
			timemillis: 1549966749571
		});
	});

	it('should change time value', () => {
		const wrapper = shallow(stubElement());
		const instance = wrapper.dive().dive().instance();
		instance.onFocus();
		instance.onChange('11.42');
		instance.onBlur();

		expect(instance.state).toEqual({
			isActive: false,
			customValue: '11:42',
			hour: 11,
			minute: 42,
			meridiem: 'am',
			timemillis: 1549989720000
		});
	});
});
