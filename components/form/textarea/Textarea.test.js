import * as React from 'react';

import { shallow, mount } from 'enzyme';

import Textarea from './Textarea';

const TEST_VALUE = 'Ice T net worth';
const TEST_LABEL = 'High Rollers';
const TEST_NAME = 'test';
const noop = () => {};
const TEST_ROWS = 5;

const stubElement = ({
	autogrow = false,
	error = '',
	label = TEST_LABEL,
	name = TEST_NAME,
	onChange = noop,
	rows = TEST_ROWS,
	value = TEST_VALUE
} = {}) => (
	<Textarea
		autogrow={autogrow}
		error={error}
		label={label}
		name={name}
		onChange={onChange}
		rows={rows}
		value={value}
	/>
);

describe('<Textarea />', () => {
	it('should render correctly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should have proper classNames when type is autogrow', () => {
		const wrapper = mount(stubElement({
			autogrow: true
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger an event when input is changed', () => {
		const onChange = jest.fn();
		const wrapper = mount(stubElement({
			onChange
		}));
		wrapper.find('textarea').simulate('change', { target: { value: 'foo' } });
		expect(onChange).toHaveBeenCalledWith('foo', {'value': 'foo'});
	});
});
