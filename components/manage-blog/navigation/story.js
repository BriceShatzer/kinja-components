/* @flow */

import * as React from 'react';
import {
	action,
	select,
	storiesOf,
	withDocs
} from 'base-storybook';
import styled from 'styled-components';

import README from './README.md';
import ManageBlogNav from './ManageBlogNav';


storiesOf('4. Components|Manage Blog/Navigation', module)
	.addDecorator(withDocs(README))
	.add('Manage Blog Nav', () => {

		const Container = styled.div`
			max-width: 1088px;
			margin: 0 auto;
		`;

		const menuItems = {
			'Posts': ['Preview', 'Published', 'Scheduled', 'Drafts'],
			'Story Types': [],
			'Moderation': ['Flags', 'Followed', 'Blocked'],
			'Members': [],
			'Settings': []
		};

		const activeMenu = select('Active Menu', Object.keys(menuItems), 'Posts');

		const defaultSubMenu = menuItems[activeMenu].length ? menuItems[activeMenu][0] : '';
		const activeSubMenu = defaultSubMenu
			? select('Active Submenu', menuItems[activeMenu], defaultSubMenu)
			: select('Active Submenu', menuItems[activeMenu]);

		return (
			<Container>
				<ManageBlogNav
					activeMenu={activeMenu}
					activeSubMenu={activeSubMenu}
					onSearch={action('Search Query')}
					onItemClicked={action('Menu Clicked')}
					onlyPostsNavigation={false}
				/>
			</Container>
		);
	});