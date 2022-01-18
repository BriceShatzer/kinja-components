import * as React from 'react';
import { shallow, mount } from 'enzyme';

import DateFilter from './';


describe('<DateFilter />', () => {
	const onChange = jest.fn();
	const todayTimemillisStub = 1559907522917; // 06/07/2019

	const stubElement = () => (
		<DateFilter
			defaultChecked="Show all stories"
			onChange={onChange}
			currentTimemillis={todayTimemillisStub}
		/>
	);

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => todayTimemillisStub);
	});

	it('should render properly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should call onChange', () => {
		const wrapper = mount(stubElement());
		const radio = wrapper.find('Radio').at(1);
		radio.simulate('click');

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith({
			checked: 'Last 24 hours',
			dateStart: 1559907522917 - 86400000,
			dateEnd: null
		});
		onChange.mockClear();
	});

	it('should call onChange with customDate', () => {
		const wrapper = mount(stubElement());
		wrapper.instance().onCustomDateChange({ day: 2, month: 4, year: 2016 }, 'to');

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith({
			checked: 'Show all stories',
			dateStart: 915145200000,
			dateEnd: 1459569600000
		});
	});
});