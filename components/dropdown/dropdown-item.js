// @flow

import * as React from 'react';
import styled from 'styled-components';
import Link from '../elements/link';
import Icon19, { IconWrapper } from '../icon19/icon19';

/*
	Dropdown element used in the byline for the tag dropdown and PostTools dropdown.
	This is not a generic component, and is styled specically for those use cases.
	Should not be part of the generic dropdown component.
*/
export const DropdownElement = styled(Link)`
	align-items: center;
	color: ${props => props.isActive ? props.theme.color.primary : props.theme.color.darkgray};
	cursor: pointer;
	display: flex;
	font-size: 14px;
	line-height: 2;
	padding: 6px 8px;

	${props => props.upcase && 'text-transform: uppercase;'}

	&:first-child {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	&:last-child {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	&:hover {
		background: ${props => props.theme.color.whitesmoke};
		/* override anchor styles */
		color: ${props => props.isActive ? props.theme.color.primary : props.theme.color.darkgray};
		text-decoration: none;
	}

	${IconWrapper} {
		margin-right: 15px;
	}
`;

export const DropdownItem = ({
	className,
	isActive,
	title,
	href,
	icon,
	onClick,
	upcase,
	events
}: {
	className?: String,
	isActive?: boolean,
	title?: string,
	href?: string,
	icon?: React.Element<typeof Icon19>,
	onClick?: () => *,
	upcase?: boolean,
	events?: ?Array<Array<?string | {[key: string]: mixed}>>
}) => (
	<DropdownElement
		className={className}
		isActive={isActive}
		onClick={onClick}
		title={title}
		upcase={upcase}
		href={href}
		events={events}
	>
		{icon}
		{title}
	</DropdownElement>
);
