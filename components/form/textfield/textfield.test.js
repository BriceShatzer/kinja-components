import * as React from 'react';

import { shallow, mount } from 'enzyme';

import Textfield from './textfield';

const TEST_DESCRIPTION = 'Test';
const TEST_NAME = 'test';
const noop = () => {};

const stubElement = ({
	onChange = noop,
	name = TEST_NAME,
	description = TEST_DESCRIPTION,
	disabled = false,
	error = ''
} = {}) => (
	<Textfield
		onChange={onChange}
		name={name}
		description={description}
		disabled={disabled}
		error={error}
	/>
);

describe('<Textfield />', () => {
	it('should render correctly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should be disabled', () => {
		const wrapper = shallow(stubElement({
			disabled: true
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger an event when input is changed', () => {
		const onChange = jest.fn();
		const wrapper = mount(stubElement({
			onChange
		}));
		wrapper.find('input').simulate('change', { target: { value: 'foo' } });
		expect(onChange).toHaveBeenCalledWith('foo');
	});
});
