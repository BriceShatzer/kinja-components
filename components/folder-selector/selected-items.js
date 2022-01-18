// @flow

import * as React from 'react';
import styled from 'styled-components';

import media from 'kinja-components/style-utils/media';
import CloseIcon from '../icon19/Close';
import type { LevelId } from './types';


const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 400px;
`;

const ItemWrapper = styled.span`
	position: relative;
	bottom: -2px;
	display: flex;
	align-items: center;
	margin-right: 10px;
`;

const PlaceholderWrapper = styled.span`
	position: relative;
	bottom: -2px;
	color: ${props => props.theme.color.gray};
`;

const IconOnDesktop = styled.div``;
const IconOnMobile = styled.div`
	position: relative;
	top: -7px;
	left: 2px;
`;

export const IconWrapper = styled.div`
	position: relative;
	top: -2px;
	width: 22px;
	height: 22px;
	padding: 2px;
	margin-right: 4px;

	${IconOnDesktop} {
		display: none;
	}

	${media.mediumUp`
		${IconOnMobile} {
			display: none;
		}

		${IconOnDesktop} {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}
	`}
`;

type Props = {
	placeholder?: string,
	selectedItems: Array<*>,
	onDeselect: (event: SyntheticMouseEvent<HTMLDivElement>, id: LevelId, parentId?: LevelId) => void
}

type State = {
	hoveredElementId: ?LevelId
}

export default class SelectedItems extends React.Component <Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hoveredElementId: null
		};
	}

	isHovered(id: LevelId) {
		return this.state.hoveredElementId === id;
	}

	onMouseOver = (id: LevelId) => {
		this.setState({ hoveredElementId: id });
	}

	onMouseLeave = () => {
		this.setState({ hoveredElementId: null });
	}

	onDeselect = (event: SyntheticMouseEvent<HTMLDivElement>, id: LevelId, parentId?: LevelId) => {
		this.setState({ hoveredElementId: null });
		this.props.onDeselect(event, id, parentId);
	}

	render() {
		const { placeholder, selectedItems } = this.props;
		const { hoveredElementId } = this.state;

		if (!selectedItems.length) {
			return <PlaceholderWrapper>{placeholder}</PlaceholderWrapper> || null;
		}

		const getParentComponent = parent => {
			return (
				<ItemWrapper key={parent.name}>
					<IconWrapper
						onClick={e => this.onDeselect(e, parent.id)}
						onMouseOver={() => this.onMouseOver(parent.id)}
						onMouseLeave={this.onMouseLeave}
					>
						<IconOnDesktop>
							{this.isHovered(parent.id) ? <CloseIcon /> : parent.icon}
						</IconOnDesktop>
						{/* on mobile view we always display the close icon */}
						<IconOnMobile>{<CloseIcon />}</IconOnMobile>
					</IconWrapper>
					{parent.name}
				</ItemWrapper>
			);
		};

		const getChildComponent = (child, parent) => {
			return (
				<ItemWrapper key={child.name}>
					<IconWrapper
						onClick={e => this.onDeselect(e, child.id, parent.id)}
						onMouseOver={() => this.onMouseOver(child.id)}
						onMouseLeave={this.onMouseLeave}
						isHovered={child.id === hoveredElementId}
					>
						<IconOnDesktop>
							{this.isHovered(child.id) ? <CloseIcon /> : parent.icon}
						</IconOnDesktop>
						<IconOnMobile>{<CloseIcon />}</IconOnMobile>
					</IconWrapper>
					{child.name}
				</ItemWrapper>
			);
		};

		return (
			<Wrapper>
				{selectedItems.map(parentItem => {
					if (parentItem.isLastSelection) {
						return getParentComponent(parentItem);
					}

					if (parentItem.isParentSelected) {
						return [getParentComponent(parentItem)].concat(
							parentItem.selectedChildren.map(child => {
								return getChildComponent(child, parentItem);
							})
						);
					}

					return parentItem.selectedChildren.map(child => {
						return getChildComponent(child, parentItem);
					});
				})}
			</Wrapper>
		);
	}
}
