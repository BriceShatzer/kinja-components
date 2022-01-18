import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Radio from './radio';


describe('<Radio />', () => {
	const onClick = jest.fn();

	const stubElement = ({
		checked = false,
		label = 'label',
		name = 'name',
		value = 'value'
	} = {}) => (
		<Radio
			checked={checked}
			label={label}
			name={name}
			onClick={onClick}
			value={value}
		/>
	);

	it('should render properly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger an onChange when it is checked', () => {
		const wrapper = mount(stubElement());
		wrapper.find('input').simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith('value');
	});
});