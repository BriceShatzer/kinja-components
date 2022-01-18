// @flow

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

export type Icon19Type = {
	children?: React.Node,
	className?: string,
	description?: string,
	onClick?: () => void
};

type IconCircleProps = {
	icon: React.StatelessFunctionalComponent<Icon19Type>,
	color?: string,
	className?: string
};

export const IconWrapper = styled.span`
	fill: currentColor;
	display: flex;
`;

const Circle = styled.span`
	width: 32px;
	height: 32px;
	background-color: ${props => props.color ? props.color : props.theme.color.primary};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;

	${IconWrapper} {
		fill: ${props => props.theme.color.white};
	}
`;

export const IconCircle = (props: IconCircleProps) => {
	const Icon = props.icon;
	const className = props.className || '';
	return (
		<EnsureDefaultTheme>
			<Circle className={className} color={props.color}>
				<Icon/>
			</Circle>
		</EnsureDefaultTheme>
	);
};

const Icon19 = ({
	children,
	className,
	description,
	onClick
}: Icon19Type) => (
	<IconWrapper className={className} aria-label={description} onClick={onClick}>
		{children}
	</IconWrapper>
);

export default Icon19;
