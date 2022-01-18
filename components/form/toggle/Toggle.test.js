import * as React from 'react';
import { shallow, mount} from 'enzyme';

import Toggle from './Toggle';

const TEST_LABEL = 'Toggle World Peace';
const TEST_NAME = 'test';
const noop = () => {};

const stubElement = ({
	label = TEST_LABEL,
	name = TEST_NAME,
	onChange = noop,
	small = false
} = {}) => (
	<Toggle
		onChange={onChange}
		label={label}
		name={name}
		small={small}
	/>
);

describe('<Toggle />', () => {
	it('should render correctly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should resize when small prop is passed', () => {
		const wrapper = shallow(stubElement({
			small: true
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger an event when input is changed', () => {
		const onChange = jest.fn();
		const wrapper = mount(stubElement({
			onChange
		}));
		wrapper.find('input').simulate('change', { target: { checked: true } });
		expect(onChange).toHaveBeenCalledWith(true);
	});
});
