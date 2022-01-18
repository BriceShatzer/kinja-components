/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

const TabListElement = styled.li``;

export const TabLink = styled.a`
	&& {
		padding: 5px;
		text-decoration: none;
		color: ${props => props.theme.color.darksmoke};

		&:focus,
		&:hover {
			outline: none;
			color: ${props => props.theme.color.darksmoke};
		}

		${props => props.selected && css`
			color: ${props => props.theme.color.black};
			font-weight: bold;
			padding: 5px 3px;
		`}
	}
`;

type Props = {
	selected?: boolean,
	onClick?: () => void,
	value: string,
	label: string,
	index: number,
	hidden?: boolean,
	count?: number,
	className?: string
};

class TabItem extends React.PureComponent<Props> {
	render() {
		const {
			selected,
			onClick,
			value,
			label,
			index,
			count
		} = this.props;

		const hidden = this.props.hidden || false;
		const counter = count ? ` (${count})` : null;

		if (hidden) {
			return null;
		}

		return (
			<TabListElement className={this.props.className}>
				<TabLink
					onClick={onClick}
					role="link" tabIndex={index}
					value={value}
					selected={selected}
				>
					{label}{counter}
				</TabLink>
			</TabListElement>
		);
	}
}

export default TabItem;
