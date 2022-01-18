/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../theme';
import type { ToggleProps } from '../../types';

export const Wrapper = styled.label`
	display: flex;
	align-items: center;
	font-size: 16px;
	line-height: 21px;
`;

const toggleBallSize = 21;
const toggleBallSizeSmall = 14;
const toggleWidth = toggleBallSize * 1.7;
const toggleWidthSmall = toggleBallSizeSmall * 1.7;
const toggleRadius = 100;
const toggleTransition = '0.25s ease-in-out';

export const ToggleWrapper = styled.span`
	display: flex;
	align-items: center;
	height: ${toggleBallSize}px;
	color: ${props => props.theme.color.gray};
	margin-right: 7px;
	input {
		opacity: 0;
		width: 0;

		+ label {
			display: flex;
			position: relative;
			box-shadow: inset 0 0 0 1px ${props => props.theme.color.gray};
			text-indent: -5000px;
			height: ${toggleBallSize}px;
			width: ${toggleWidth}px;
			border-radius: ${toggleRadius}px;
			transition: ${toggleTransition};

			&:hover {
				cursor: pointer;
			}

			&::after {
				content: '';
				position: absolute;
				display: block;
				top: 2px;
				left: 2px;
				border-radius: 100px;
				transition: ${toggleTransition};
				height: ${toggleBallSize - 4}px;
				width: ${toggleBallSize - 4}px;
				background: ${props => props.theme.color.gray};
			}
		}
	}

	input:checked + label {
		box-shadow: inset 0 0 0 1px ${props => props.theme.color.primary};

		&::after {
			left: ${toggleWidth - toggleBallSize + 2}px;
			background: ${props => props.theme.color.primary};
		}
	}

	${props => props.small && css`
		height: ${toggleBallSizeSmall}px;

		input + label {
			height: ${toggleBallSizeSmall}px;
			width: ${toggleWidthSmall}px;
			top: -1px;

			&::after {
				height: ${toggleBallSizeSmall - 4}px;
				width: ${toggleBallSizeSmall - 4}px;
			}
		}

		input:checked + label {
			&::after {
				left: ${toggleWidthSmall - toggleBallSizeSmall + 2}px;
			}
		}
	`}
`;

const Toggle = (props: ToggleProps) => {
	const {
		blogTheme,
		checked,
		label,
		name,
		onChange,
		small
	} = props;

	return (
		<Theme blog={blogTheme}>
			<Wrapper>
				<ToggleWrapper small={small}>
					<input
						type="checkbox"
						name={name}
						id={name}
						onChange={event => onChange(event.target.checked)}
						checked={checked}
					/>
					<label htmlFor={name} />
				</ToggleWrapper>
				<span>{label}</span>
			</Wrapper>
		</Theme>
	);
};

export default Toggle;
