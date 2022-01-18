// @flow

import * as React from 'react';

import { mount } from 'enzyme';
import renderer from 'react-test-renderer';


import Textfield18 from './textfield';

const TEST_INLINE_HELP = 'Test inline help';
const TEST_NAME = 'test';
const TEST_LABEL = 'Test label';
const TEST_ERROR = 'Value too long';
const noop = () => {};

const stubElement = ({
	onChange = noop,
	name = TEST_NAME,
	label = TEST_LABEL,
	inlineHelp = TEST_INLINE_HELP,
	...rest
}: {
	onChange?: string => void,
	name?: string,
	label?: string,
	inlineHelp?: string
} = {}) => (
	<Textfield18
		onChange={onChange}
		name={name}
		label={label}
		inlineHelp={inlineHelp}
		{...rest}
	/>
);

describe('<Textfield18 />', () => {
	it('should render correctly', () => {
		const wrapper = renderer.create(stubElement()).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should be disabled', () => {
		const wrapper = renderer.create(stubElement({ disabled: true })).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should show error message', () => {
		const wrapper = renderer.create(stubElement({ error: TEST_ERROR })).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render as a password input', () => {
		const passwordWrapper = renderer.create(stubElement({
			type: 'password'
		})).toJSON();
		expect(passwordWrapper).toMatchSnapshot();
	});

	it('should trigger an event when input is changed', () => {
		const onChange = jest.fn();
		const wrapper = mount(stubElement({
			onChange
		}));

		wrapper.find('input').simulate('change', { target: { value: 'foo' } });
		expect(onChange).toHaveBeenCalledWith('foo', {'value': 'foo'});
	});
});
