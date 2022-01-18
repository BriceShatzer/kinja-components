/* @flow */

import * as React from 'react';
import { EnsureDefaultTheme } from '../theme';
import styled from 'styled-components';
import { darken } from 'polished';

export type ToolbarItemProps = {
	onClick?: mixed => mixed,
	href?: string,
	target?: string,
	children?: React.Node,
	title?: string,
	dataGa?: string,
	className?: string
};

export type ToolbarButtonProps = {
	children?: React.Node
};

export type Props = {
	children?: Function
};

export const Item = styled.a`
	align-items: center;
	cursor: pointer;
	display: flex;
	height: 39px;
	justify-content: center;
	min-width: 39px;
	text-decoration: none;

	color: ${props => props.theme.color.primary};
	transition: color 200ms;

	&:hover {
		color: ${props => darken(0.2, props.theme.color.primary)};
	}
`;

const Button = styled.span`
	padding: 0 10px;
`;

export const Toolbar = styled.div`
	background-color: ${props => props.theme.color.midgray};
	border-radius: 3px;
	border: 1px solid ${props => props.theme.color.midgray};
	display: grid;
	grid-auto-flow: column;
	grid-gap: 1px;

	& > ${Item} {
		&:first-child {
			border-top-left-radius: 3px;
			border-bottom-left-radius: 3px;
		}
		&:last-child {
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
		}
		background-color: white;
	}
`;

const ToolbarItem = (props: ToolbarItemProps) => (
	<Item
		onClick={props.onClick}
		href={props.href}
		title={props.title}
		target={props.target}
		data-ga={props.dataGa}
		className={props.className}
	>
		{props.children}
	</Item>
);

const ToolbarButton = (props: ToolbarButtonProps) =>
	<Button>{props.children}</Button>;

function ShareToolbar(props: Props) {
	return (
		<EnsureDefaultTheme>
			<Toolbar>
				{props.children ? props.children({
					ToolbarItem,
					ToolbarButton
				}) : null}
			</Toolbar>
		</EnsureDefaultTheme>
	);
}

export default ShareToolbar;
