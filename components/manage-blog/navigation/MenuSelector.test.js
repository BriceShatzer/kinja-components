import * as React from 'react';
import { mount } from 'enzyme';

import MenuSelector, { SelectedMenu } from './MenuSelector';

const stubElement = ({
	activeMenu,
	menuList,
	onClick = () => {}
} = {}) => (
	<MenuSelector
		activeMenu={activeMenu}
		menuList={menuList}
		onClick={onClick}
	/>
);

const SAMPLE_ACTIVE_MENU = 'Posts';
const SAMPLE_MENU_LIST = ['Posts', 'Story Types', 'Moderation', 'Members', 'Settings'];


describe('<MenuSelector />', () => {
	let wrapper;
	const handler = jest.fn();

	beforeAll(() => {
		wrapper = mount(stubElement({
			activeMenu: SAMPLE_ACTIVE_MENU,
			menuList: SAMPLE_MENU_LIST,
			onClick: handler
		}));
	});

	it('should render properly', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('should open when SelectedMenu is clicked', () => {
		const selectedMenu = wrapper.find(SelectedMenu);
		selectedMenu.simulate('click');

		expect(wrapper.state().isOpen).toEqual(true);
	});

	// TODO write more TESTS!

});