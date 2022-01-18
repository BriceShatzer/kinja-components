import * as React from 'react';

import { shallow, mount } from 'enzyme';

import Filefield from './filefield';

const TEST_DESCRIPTION = 'Test';
const TEST_NAME = 'test';
const noop = () => {};

const stubElement = ({
	name = TEST_NAME,
	description = TEST_DESCRIPTION,
	onChange = noop,
	error = ''
} = {}) => (
	<Filefield
		onChange={onChange}
		name={name}
		description={description}
		error={error}
	/>
);

describe('<Filefield />', () => {
	it('should include name', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger an onChange when file is selected', () => {
		const onChange = jest.fn();
		const wrapper = mount(stubElement({ onChange }));
		wrapper.find('input').simulate('change', {});
		expect(onChange).toHaveBeenCalled();
	});
});
