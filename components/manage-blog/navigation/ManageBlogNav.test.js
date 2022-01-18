import * as React from 'react';
import { shallow, mount } from 'enzyme';

import ManageBlogNav, { MenuItem } from './ManageBlogNav';


describe('<ManageBlogNav />', () => {
	it('should render properly', () => {
		const handler = jest.fn();
		const wrapper = shallow(
			<ManageBlogNav activeMenu="Posts" activeSubMenu="Published" onSearch={handler}/>
		);
		expect(wrapper).toMatchSnapshot();

		wrapper.setState({ activeMenu: 'Story Types' });
		expect(wrapper).toMatchSnapshot();
		wrapper.setState({ activeMenu: 'Moderation' });
		expect(wrapper).toMatchSnapshot();
		wrapper.setState({ activeMenu: 'Members' });
		expect(wrapper).toMatchSnapshot();
		wrapper.setState({ activeMenu: 'Settings' });
		expect(wrapper).toMatchSnapshot();
		handler.mockClear();
	});

	it('should pass search values', () => {
		const handler = jest.fn();
		const wrapper = mount(
			<ManageBlogNav activeMenu="Posts" activeSubMenu="Published" onSearch={handler}/>
		);

		const inputValue = 'Between Two Ferns';
		const input = wrapper.find('input');

		input.simulate('change', { target: { value: inputValue }});
		input.simulate('keyDown', { key: 'Enter' });

		expect(handler).toHaveBeenCalledWith(inputValue);
		handler.mockClear();
	});

	it('should call onItemClicked with value of the clicked menu item', () => {
		const handler = jest.fn();
		const wrapper = mount(
			<ManageBlogNav activeMenu="Story Types" onItemClicked={handler}/>
		);

		const postsMenu = wrapper.find(MenuItem).at(0);
		postsMenu.simulate('click');
		expect(handler).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
		handler.mockClear();
	});

	it('should display only Posts menu', () => {
		const handler = jest.fn();
		const wrapper = mount(
			<ManageBlogNav activeMenu="Posts" onSearch={handler} onlyPostsNavigation />
		);

		const menus = wrapper.find(MenuItem);
		expect(menus).toHaveLength(1);
		handler.mockClear();
	});
});
