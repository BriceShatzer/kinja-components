import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Checkbox from './checkbox';


describe('<Checkbox />', () => {
	const onChange = jest.fn();

	const stubElement = ({
		checked = true,
		inlineHelp = '',
		label = 'label',
		name = 'name',
		value = 'value'
	} = {}) => (
		<Checkbox
			checked={checked}
			inlineHelp={inlineHelp}
			label={label}
			name={name}
			onChange={onChange}
			value={value}
		/>
	);

	it('should render properly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should render inlineHelp propery', () => {
		const wrapper = shallow(stubElement({ inlineHelp: 'St-Nicolas Parc Chaudiere' }));
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger an onChange when it is checked', () => {
		const wrapper = mount(stubElement());
		wrapper.find('input').simulate('change', {});
		expect(onChange).toHaveBeenCalled();
	});
});