// @flow

import * as React from 'react';
import { EnsureDefaultTheme } from 'kinja-components/components/theme';
import styled, {css} from 'styled-components';

import StarIcon from '../../icon19/Star';
import StarFilledIcon from '../../icon19/StarFilled';

export const ActionIconWrapper = styled.div`
	position: absolute;
	top: 8px;
	z-index: 1;
	opacity: 0;
	width: 32px;
	height: 32px;
	border-radius: 5px;
	cursor: pointer;
	transition: 0.4s opacity;
	background: ${({ theme }) => theme.color.blackOverlay};
	pointer-events: ${({ noPointer }) => noPointer ? 'none' : 'auto'};

	&:hover {
		opacity: 1;
	}

	${({ position }) => position === 'right' ? css`
		right: 8px;
	` : `
		left: 8px;
	`}

	svg {
		position: relative;
		display: block;
		margin: auto;
		color: ${({ theme }) => theme.color.white};
		opacity: 0.5;
		top: 7px;

		${({ active }) => active && css`
			color: ${({ theme }) => theme.color.primary};
			opacity: 1;
		`}
	}
`;

export default function RecommendStar({isActive, attributes, onClick, position = 'right' }: {
	isActive?: boolean,
	attributes: *,
    onClick?: (event: MouseEvent) => void,
    position?: 'right' | 'left'
}) {
	return (<EnsureDefaultTheme>
		<ActionIconWrapper active={isActive}
			position={position}
			className="recommend"
			data-active={isActive}
			onClick={onClick}
			{...attributes}>
			{isActive ? <StarFilledIcon /> : <StarIcon />}
		</ActionIconWrapper>
	</EnsureDefaultTheme>);
}