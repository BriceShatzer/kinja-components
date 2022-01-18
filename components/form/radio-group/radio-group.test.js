import * as React from 'react';
import { shallow, mount } from 'enzyme';

import RadioGroup from './';
import Radio from '../radio';


describe('<Radio />', () => {
	const onChange = jest.fn();

	const stubElement = ({
		inlineHelp,
		name,
		title
	} = {}) => (
		<RadioGroup
			inlineHelp={inlineHelp}
			name={name}
			onChange={onChange}
			title={title}
		>
			<Radio label="Shanghai" checked value="Shanghai" />
			<Radio label="Tokyo" value="Tokyo" />
			<Radio label="Moscow" value="Moscow" />
		</RadioGroup>
	);

	it('should render properly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should set state', () => {
		const wrapper = mount(stubElement());
		const instance = wrapper.instance();

		instance.onChange('Moscow');
		expect(wrapper.state()).toEqual({
			checked: 'Moscow'
		});
		onChange.mockClear();
	});

	it('should call onChange', () => {
		const wrapper = mount(stubElement());
		const instance = wrapper.instance();

		instance.onChange('Tokyo');
		wrapper.update();

		const tokyoButton = wrapper.find(Radio).at(1);
		expect(tokyoButton.props().checked).toEqual(true);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith('Tokyo');
	});
});