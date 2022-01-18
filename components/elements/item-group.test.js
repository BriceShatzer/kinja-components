import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Button from '../buttons/Button';
import ItemGroup from './item-group';


const options = [
	<Button key='key-0' label='Dolores' value='dolores' selected />,
	<Button key='key-1' label='Ford' value='ford' />,
	<Button key='key-2' label='Bernard' value='bernard' />
];

const stubElement = ({
	children = options,
	childrenProps = { small: true },
	onChange
} = {}) => (
	<ItemGroup
		childrenProps={childrenProps}
		onChange={onChange}
	>
		{children}
	</ItemGroup>
);

const button = (
	<Button label="Dolores" />
);

describe('<ItemGroup />', () => {
	it('should render Button component', () => {
		const wrapper = shallow(button);
		expect(wrapper).toMatchSnapshot();
	});

	it('should update the state when one of the children is clicked', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
		wrapper.find({ value: 'ford' }).at(0).simulate('click');
		expect(wrapper.state().selected).toEqual('ford');
	});

	it('should call `onChange` with the value', () => {
		const onChange = jest.fn();

		const wrapper = mount(stubElement({
			onChange
		}));
		expect(wrapper).toMatchSnapshot();
		wrapper.find({ value: 'bernard' }).at(0).simulate('click');
		expect(onChange).toHaveBeenCalledWith('bernard');
	});

	it('should not call `onChange`', () => {
		const onChange = jest.fn();

		const wrapper = mount(stubElement({
			onChange
		}));
		expect(wrapper).toMatchSnapshot();
		wrapper.find({ value: 'dolores' }).at(0).simulate('click');
		expect(onChange).not.toHaveBeenCalled();
	});

	it('should pass `childrenProps` to the children', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
		const firstButton = wrapper.find({ value: 'dolores' }).at(0);

		expect(firstButton.props().small).toEqual(true);
	});
});
