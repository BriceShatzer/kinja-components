/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import MenuSelector, { Wrapper as MenuSelectorWrapper, SelectedMenu } from './MenuSelector';
import SearchBar, { SearchBarWrapper } from '../../search-bar';
import { KinjaTextField, KinjaFormFieldWrapper } from '../../form/textfield18/textfield';
import { Wrapper as FieldWrapper } from '../../form/field/field';
import media from '../../../style-utils/media';


const MenuWrapper = styled.ul`
	display: none;
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
`;

export const MenuItem = styled.li`
	position: relative;
	bottom: -1px;
	padding-bottom: 13px;
	color: ${props => props.theme.color.gray};
	font-size: 25px;
	line-height: 30px;
	cursor: pointer;

	:hover {
		color: ${props => props.theme.color.black};
	}

	&:not(:last-of-type) {
		margin-right: 33px;
	}

	${props => props.selected && css`
		color: ${props.theme.color.black};
		border-bottom: 1px solid ${props.theme.color.black};
	`}
`;

const SubMenuWrapper = styled.div`
	display: flex;
	flex-direction: column;

	${SearchBarWrapper} {
		padding: 22px 14px 0;
		margin: 0;
	}

	${FieldWrapper} {
		padding-left: 0;
	}
`;

const SubMenuList = styled.ul`
	display: flex;
`;

const SubMenuItem = styled.li`
	padding: 10px 10px 0;
	font-size: 16px;
	color: ${props => props.theme.color.gray};
	line-height: 19px;
	cursor: pointer;

	&:first-of-type {
		padding-left: 14px;
	}

	&:last-of-type {
		padding-right: 10px;
	}

	&:hover {
		color: ${props => props.theme.color.black};
	}

	${props => props.selected && css`
		color: ${props.theme.color.black};
		font-weight: bold;
	`}
`;

const Container = styled.div`
	width: 100%;

	${KinjaFormFieldWrapper} {
		margin-bottom: 0;
	}

	${KinjaTextField} {
		font-size: 16px;
	}

	${SelectedMenu} {
		padding: 14px;
	}

	${media.mediumUp`
		${SelectedMenu} {
			padding-left: 14px;
		}

		${SubMenuWrapper} {
			padding-top: 4px;
		}

		${SubMenuItem} {
			padding: 14px 14px 0;
		}
	`}

	${media.largeUp`
		${MenuSelectorWrapper} {
			display: none;
		}

		${MenuWrapper} {
			display: flex;
		}

		${SubMenuWrapper} {
			flex-direction: row;
			justify-content: space-between;
			align-items: flex-start;
		}

		${SubMenuItem} {
			&:first-of-type {
				padding-left: 0;
			}
		}

		${SearchBarWrapper} {
			position: relative;
			align-items: flex-end;
			max-width: 580px;
			bottom: -2px;
			padding: 0;
			margin-left: 14px;
		}

		${KinjaTextField}::placeholder {
			text-transform: uppercase;
		}
	`}
`;

type Props = {
	activeMenu: string,
	activeSubMenu: string,
	onSearch: (value: string) => void,
	onItemClicked: (value: string, event: Array<string>) => void,
	onlyPostsNavigation: boolean
}

type State = {
	activeMenu: string,
	activeSubMenu: string,
	isOpen: boolean,
	subMenuItems: Array<string>,
	inputValue: string
}

type MenuItems = {
	Posts: Array<string>,
	'Story Types'?: Array<string>,
	Moderation?: Array<string>,
	Members?: Array<string>,
	Settings?: Array<string>
}

let menuItems: MenuItems = {
	'Posts': ['Preview', 'Published', 'Scheduled', 'Drafts'],
	'Story Types': [],
	'Moderation': ['Flags', 'Followed', 'Blocked'],
	'Members': [],
	'Settings': []
};

class ManageBlogNav extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			activeMenu: '',
			activeSubMenu: '',
			isOpen: false,
			inputValue: '',
			subMenuItems: []
		};
	}

	componentWillMount() {
		const { activeMenu, activeSubMenu, onlyPostsNavigation } = this.props;

		if (onlyPostsNavigation) {
			menuItems.Posts.shift();
		}

		if (onlyPostsNavigation) {
			menuItems = {
				'Posts': menuItems.Posts
			};
		}

		this.setState({
			activeMenu,
			activeSubMenu,
			subMenuItems: menuItems[activeMenu]
		});
	}

	onMenuClicked = (clickedMenu: string) => {
		const previousSelectedMenu = this.state.activeMenu.replace(/\s/g, '').toLowerCase();
		const nextSelectedMenu = clickedMenu.replace(/\s/g, '').toLowerCase();
		let nextActiveSubmenu;

		// if there are submenus available, we pass the first one
		// to set it active
		if (nextSelectedMenu === 'moderation') {
			nextActiveSubmenu = 'flags';
		} else if (nextSelectedMenu === 'posts') {
			nextActiveSubmenu = 'preview';
		}

		if (previousSelectedMenu !== nextSelectedMenu) {
			let event = [];
			if (Object.keys(menuItems).includes(clickedMenu)) {
				event = ['Manage page click', 'Sub nav click', clickedMenu];
			} else if (menuItems.Posts.includes(clickedMenu)) {
				event = ['Manage page click', `Posts - ${clickedMenu === 'Drafts' ? 'Draft' : clickedMenu} posts click`];
			} else {
				event = ['Manage page click', `Moderation - ${clickedMenu} click`];
			}
			// check events
			this.props.onItemClicked(nextActiveSubmenu || nextSelectedMenu, event);
		}
	}

	onSearch = () => {
		this.props.onSearch(this.state.inputValue);
	}

	onInputChanged = (value: string) => {
		this.setState({
			inputValue: value
		});
	}

	render() {
		const { subMenuItems } = this.state;
		const { activeMenu, activeSubMenu } = this.props;

		let searchBarPlaceholder = 'Search Published Posts';
		if (activeSubMenu === 'Scheduled') {
			searchBarPlaceholder = 'Search Scheduled Posts';
		}
		if (activeSubMenu === 'Drafts') {
			searchBarPlaceholder = 'Search Drafts';
		}

		return (
			<EnsureDefaultTheme>
				<Container>
					<MenuWrapper>
						{Object.keys(menuItems).map(menuItem =>
							<MenuItem
								key={menuItem}
								onClick={() => this.onMenuClicked(menuItem)}
								selected={menuItem === activeMenu}
							>
								{menuItem}
							</MenuItem>
						)}
					</MenuWrapper>
					<MenuSelector activeMenu={activeMenu} menuList={Object.keys(menuItems)} onClick={menu => this.onMenuClicked(menu)} />
					{subMenuItems.length > 0 &&
						<SubMenuWrapper>
							<SubMenuList>
								{subMenuItems.map(subMenuItem =>
									<SubMenuItem
										key={subMenuItem}
										onClick={() => this.onMenuClicked(subMenuItem)}
										selected={subMenuItem === activeSubMenu}
									>
										{subMenuItem}
									</SubMenuItem>
								)}
							</SubMenuList>
							{activeMenu === 'Posts'
								&& activeSubMenu !== 'Preview'
								&& <SearchBar onInputChanged={this.onInputChanged}
									inputValue={this.state.inputValue}
									placeholder={searchBarPlaceholder}
									onSearch={this.onSearch}
									focusOnMount
								/>
							}
						</SubMenuWrapper>
					}
				</Container>
			</EnsureDefaultTheme>
		);
	}
}

export default ManageBlogNav;