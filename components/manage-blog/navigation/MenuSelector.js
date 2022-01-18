/* @flow */

import * as React from 'react';
import styled from 'styled-components';

// ICONS
import ChevronUpIcon from '../../icon19/ChevronUp';
import ChevronDownIcon from '../../icon19/ChevronDown';

import { EnsureDefaultTheme } from '../../theme';
import Toggle from '../../hoc/toggle';

import type { ToggleInjectedProps } from '../../hoc/toggle';


export const Wrapper = styled.div`
	position: relative;
`;

const MenuItemList = styled.ul`
	position: absolute;
	width: 100%;
	background-color: ${props => props.theme.color.white};
	border: 1px solid ${props => props.theme.color.lightgray};
	z-index: 999;
`;

const MenuItem = styled.li`
	padding: 14px;
	text-align: left;
	font-size: 16px;
	color: ${props => props.theme.color.darkgray};
	line-height: 19px;
	cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.color.lightgray};
	}
`;

export const SelectedMenu = styled.div`
	display: flex;
	position: relative;
	bottom: -1px;
	height: 47px;
	padding: 14px;
	padding-left: 0;
	border-bottom: 1px solid ${props => props.theme.color.lightgray};
	cursor: pointer;
`;

const SelectedMenuItem = styled.span`
	width: 100%;
	float: left;
	text-align: left;
	font-size: 16px;
	color: ${props => props.theme.color.gray};
	line-height: 19px;
`;


type Props = {
	activeMenu: string,
	menuList: Array<string>,
	onClick: (value: string) => void
} & ToggleInjectedProps;

type State = {
	activeMenu: string,
	isOpen: boolean
}


class MenuSelector extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			activeMenu: '',
			isOpen: false
		};
	}

	componentWillReceiveProps(nextProps) {
		nextProps.activeMenu && nextProps.activeMenu !== this.state.activeMenu && this.setState({
			activeMenu: nextProps.activeMenu
		});
	}

	componentWillMount() {
		this.setState({
			activeMenu: this.props.activeMenu,
			isOpen: this.props.isOpen
		});
	}

	onSelectorClicked = () => {
		this.props.toggle();
	}

	onMenuItemSelected = event => {
		const selectedValue = event.currentTarget.innerText;

		this.setState(prevState => {
			if (prevState.activeMenu !== selectedValue) {
				window.ga('send', 'event', 'Manage page click', 'Sub nav click', selectedValue);
				return {
					activeMenu: selectedValue
				};
			}
		}, () => {
			this.props.toggle();
			this.props.onClick(selectedValue);
		});
	}

	render() {
		const { menuList, insideReference, isOpen } = this.props;

		return (
			<EnsureDefaultTheme>
				<Wrapper ref={insideReference}>
					<SelectedMenu onClick={this.onSelectorClicked}>
						<SelectedMenuItem>{this.state.activeMenu}</SelectedMenuItem>
						{isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
					</SelectedMenu>
					{isOpen &&
						<MenuItemList>
							{menuList.map(menuItem => <MenuItem key={menuItem} onClick={this.onMenuItemSelected}>{menuItem}</MenuItem>)}
						</MenuItemList>
					}
				</Wrapper>
			</EnsureDefaultTheme>
		);
	}
}


export default Toggle(MenuSelector, { isOutsideClickEnabled: true, isDefaultOpen: false });
