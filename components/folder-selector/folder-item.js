/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import CheckmarkIcon from '../icon19/Checkmark';
import ChevronRightIcon from '../icon19/ChevronRight';

import {
	selectedColor,
	selectedParentColor,
	itemPaddingVertical,
	itemPaddingHorizontal,
	defaultIcon
} from './consts';

import type { ItemProps } from './types';

export const Wrapper = styled.div`
	padding: ${itemPaddingVertical}px ${itemPaddingHorizontal}px;
	cursor: pointer;

	${props => (props.multipleSelection || !props.selected) && css`
		&:hover {
			background: ${props => props.theme.color.whitesmoke};
		}
	`}

	${props => props.selected && !props.multipleSelection && css`
		background: ${props.isLastSelection ? selectedColor : selectedParentColor};

		${props => props.isLastSelection && css`
			color: ${props => props.theme.color.white};
		`}
	`}
`;

const Inner = styled.div`
	align-items: center;
	display: flex;
	font-size: 16px;
	line-height: 22px;
`;

const IconMargin = 8;

export const IconWrapper = styled.div`
	display: flex;

	&:not(:empty) {
		margin-right: ${IconMargin}px;
	}
`;

const AvatarWrapper = styled.div`
	display: flex;
	margin-right: ${IconMargin}px;
	width: 18px;
`;

const Name = styled.div`
	flex: 1 1 auto;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	${props => props.selected && props.multipleSelection && css`
		font-weight: bold;
	`}
`;

type State = {
	hasTooltip: boolean
};

export default class FolderItem extends React.Component<ItemProps, State> {
	nameRef: { current: null | HTMLDivElement } = React.createRef();

	state = {
		hasTooltip: false
	};

	componentDidMount() {
		if (
			this.nameRef.current
			// We compare the two widths to determine if the text is truncated.
			&& this.nameRef.current.offsetWidth < this.nameRef.current.scrollWidth
		) {
			this.setState({hasTooltip: true});
		}
	}

	onSelect = () => {
		const { onSelect, id } = this.props;
		onSelect && onSelect(id);
	}

	render() {
		const {
			avatar,
			hasChildren,
			icon,
			id,
			isLastSelection,
			isFirst,
			name,
			multipleSelection,
			onSelect,
			selected,
			toggleTooltip
		} = this.props;

		if (!id || !name || !onSelect) {
			return null;
		}

		const itemIcon = icon || defaultIcon(this.props);

		function getFolderItemPrefix() {
			if (multipleSelection && selected) {
				return <IconWrapper><CheckmarkIcon /></IconWrapper>;
			} else if (multipleSelection && !isFirst) {
				return null;
			} else if (avatar) {
				return <AvatarWrapper>{avatar}</AvatarWrapper>;
			} else {
				return <IconWrapper>{itemIcon}</IconWrapper>;
			}
		}

		return (
			<Wrapper
				selected={selected}
				isLastSelection={isLastSelection}
				multipleSelection={multipleSelection}
				onClick={this.onSelect}
				data-shouldshowtooltip={this.state.hasTooltip}
				data-tooltipname={name}
				data-tooltipoffset={5}
				onMouseEnter={toggleTooltip}
				onMouseLeave={toggleTooltip}
			>
				<Inner>
					{getFolderItemPrefix()}
					<Name ref={this.nameRef} selected={selected && isFirst} multipleSelection={multipleSelection}>{name}</Name>
					{hasChildren ? <ChevronRightIcon /> : null}
				</Inner>
			</Wrapper>
		);
	}
}
