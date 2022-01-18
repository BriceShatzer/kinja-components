import * as React from 'react';
import { shallow, mount } from 'enzyme';

import BlogFilter from './';


describe('<BlogFilter />', () => {
	const blogs = [
		{
			displayName: 'Gizmodo',
			id: '4'
		},
		{
			displayName: 'The A.V. Club',
			id: '1636027099'
		},
		{
			displayName: 'Kotaku',
			id: '9'
		}
	];
	const onChange = jest.fn();

	const stubElement = () => (
		<BlogFilter
			blogs={blogs}
			checked={['4']}
			defaultBlogId="4"
			isNetwork={true}
			onChange={onChange}
		/>
	);

	it('should render properly', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should call onChange', () => {
		const wrapper = mount(stubElement());
		const event = {
			currentTarget: {
				checked: true
			}
		};
		wrapper.instance().onCheckboxChange(event, '1636027099');

		expect(onChange).toBeCalledTimes(1);
		expect(onChange).toBeCalledWith({ checked: ['4', '1636027099'], isNetwork: true });
		onChange.mockClear();
	});

	it('should call onChange with Kinja Fringe', () => {
		const wrapper = mount(stubElement());
		const event = {
			currentTarget: {
				checked: true
			}
		};
		wrapper.instance().onCheckboxChange(event);

		expect(onChange).toBeCalledWith({ checked: [], isNetwork: false });
	});
});