/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { EnsureDefaultTheme } from '../theme';
import Icon19, { IconWrapper } from '../icon19/icon19';
import ChevronDown from '../icon19/ChevronDown';
import ChevronUp from '../icon19/ChevronUp';

const getButtonColor = ({ theme, variant }) => {
	if (variant === 'secondary') {

		return {
			default: {
				border: theme.color.midgray,
				fill: 'transparent',
				text: theme.color.darksmoke
			},
			disabled: {
				border: theme.color.midgray,
				fill: 'transparent',
				text: theme.color.midgray
			},
			hover: {
				border: theme.color.darkgray,
				fill: theme.color.whitesmoke,
				text: theme.color.darksmoke
			},
			focus: {
				border: theme.color.primary,
				fill: theme.color.backgroundLight,
				text: theme.color.primary
			},
			active: {
				border: darken(0.05, theme.color.primary),
				fill: darken(0.05, theme.color.backgroundLight),
				text: darken(0.05, theme.color.primary)
			}
		};
	}

	if (variant === 'secondaryDark') {

		return {
			default: {
				border: theme.color.darkgray,
				fill: 'transparent',
				text: theme.color.white
			},
			disabled: {
				border: theme.color.darkgray,
				fill: 'transparent',
				text: theme.color.darkgray
			},
			hover: {
				border: theme.color.midgray,
				fill: theme.color.darksmoke,
				text: theme.color.white
			},
			focus: {
				border: theme.color.primaryLight,
				fill: theme.color.darksmoke,
				text: theme.color.primaryLight
			},
			active: {
				border: lighten(0.05, theme.color.primaryLight),
				fill: theme.color.darksmoke,
				text: lighten(0.05, theme.color.primaryLight)
			}
		};
	}

	if (variant === 'tertiary' || variant === 'toggleInactive') {

		return {
			default: {
				border: 'transparent',
				fill: 'transparent',
				text: theme.color.darksmoke
			},
			disabled: {
				border: 'transparent',
				fill: 'transparent',
				text: theme.color.midgray
			},
			hover: {
				border: theme.color.lightgray,
				fill: theme.color.lightgray,
				text: theme.color.darksmoke
			},
			focus: {
				border: theme.color.backgroundLight,
				fill: theme.color.backgroundLight,
				text: theme.color.primary
			},
			active: {
				border: darken(0.05, theme.color.backgroundLight),
				fill: darken(0.05, theme.color.backgroundLight),
				text: darken(0.05, theme.color.primary)
			}
		};
	}

	if (variant === 'tertiaryDark') {

		return {
			default: {
				border: 'transparent',
				fill: 'transparent',
				text: theme.color.white
			},
			disabled: {
				border: 'transparent',
				fill: 'transparent',
				text: theme.color.darkgray
			},
			hover: {
				border: theme.color.darksmoke,
				fill: theme.color.darksmoke,
				text: theme.color.white
			},
			focus: {
				border: theme.color.darksmoke,
				fill: theme.color.darksmoke,
				text: theme.color.primaryLight
			},
			active: {
				border: theme.color.darksmoke,
				fill: theme.color.darksmoke,
				text: lighten(0.05, theme.color.primaryLight)
			}
		};
	}

	if (variant === 'toggleActive') {

		return {
			default: {
				border: theme.color.darkgray,
				fill: theme.color.darkgray,
				text: theme.color.white
			},
			disabled: {
				border: theme.color.midgray,
				fill: theme.color.midgray,
				text: theme.color.white
			},
			hover: {
				border: theme.color.darksmoke,
				fill: theme.color.darksmoke,
				text: theme.color.white
			},
			focus: {
				border: theme.color.primary,
				fill: theme.color.primary,
				text: theme.color.white
			},
			active: {
				border: darken(0.05, theme.color.primary),
				fill: darken(0.05, theme.color.primary),
				text: theme.color.white
			}
		};
	}

	if (variant === 'primaryDark') {

		return {
			default: {
				border: theme.color.primaryLight,
				fill: theme.color.primaryLight,
				text: theme.color.black
			},
			disabled: {
				border: theme.color.darkgray,
				fill: theme.color.darkgray,
				text: theme.color.black
			},
			hover: {
				border: lighten(0.05, theme.color.primaryLight),
				fill: lighten(0.05, theme.color.primaryLight),
				text: theme.color.black
			},
			focus: {
				border: lighten(0.1, theme.color.primaryLight),
				fill: lighten(0.1, theme.color.primaryLight),
				text: theme.color.black
			},
			active: {
				border: lighten(0.15, theme.color.primaryLight),
				fill: lighten(0.15, theme.color.primaryLight),
				text: theme.color.black
			}
		};
	}

	return {
		default: {
			border: theme.color.primary,
			fill: theme.color.primary,
			text: theme.color.white
		},
		disabled: {
			border: theme.color.midgray,
			fill: theme.color.midgray,
			text: theme.color.white
		},
		hover: {
			border: darken(0.05, theme.color.primary),
			fill: darken(0.05, theme.color.primary),
			text: theme.color.white
		},
		focus: {
			border: darken(0.1, theme.color.primary),
			fill: darken(0.1, theme.color.primary),
			text: theme.color.white
		},
		active: {
			border: darken(0.15, theme.color.primary),
			fill: darken(0.15, theme.color.primary),
			text: theme.color.white
		}
	};
};

export const Label = styled.label`
	color: ${props => getButtonColor(props).default.text};
	cursor: pointer;
	font-size: ${props => props.isSmall ? '1rem' : '1.125rem'};
	line-height: ${props => props.isSmall ? '1.25rem' : '1.5rem'};
	transform: translate(0, 4%);
	/* The font is vertically aligned for lowercase letters by default. */
	/* This small (1px) offset is added to make uppercase letters line up better with the icon. */

	:not(:first-child) {
		margin-left: 0.25rem;
	}

	:not(:last-child) {
		margin-right: 0.25rem;
	}
`;

export const ButtonWrapper = styled.button`
	background-color: ${props => getButtonColor(props).default.fill};
	border: 1px solid ${props => getButtonColor(props).default.border};
	border-radius: 0.3125rem;
	color: ${props => getButtonColor(props).default.text};
	display: flex;
	align-items: center;
	padding: ${props => props.isSmall ? '0.3125rem 0.375rem' : '0.4375rem 0.625rem'};
	min-height: ${props => props.isSmall ? '2rem' : '2.5rem'};
	white-space: nowrap;

	${Label} {
		color: ${props => getButtonColor(props).default.text};
	}

	${IconWrapper} {
		pointer-events: none;
	}

	:hover {
		background-color: ${props => getButtonColor(props).hover.fill};
		border: 1px solid ${props => getButtonColor(props).hover.border};
		color: ${props => getButtonColor(props).hover.text};
		text-decoration: none;

		${Label} {
			color: ${props => getButtonColor(props).hover.text};
		}
	}

	:disabled {
		background-color: ${props => getButtonColor(props).disabled.fill};
		border: 1px solid ${props => getButtonColor(props).disabled.border};
		color: ${props => getButtonColor(props).disabled.text};
		cursor: default;

		${Label} {
			color: ${props => getButtonColor(props).disabled.text};
			cursor: default;
		}
	}

	:focus {
		background-color: ${props => getButtonColor(props).focus.fill};
		border: 1px solid ${props => getButtonColor(props).focus.border};
		color: ${props => getButtonColor(props).focus.text};

		${Label} {
			color: ${props => getButtonColor(props).focus.text};
		}
	}

	:enabled:active {
		background-color: ${props => getButtonColor(props).active.fill};
		border: 1px solid ${props => getButtonColor(props).active.border};
		color: ${props => getButtonColor(props).active.text};

		${Label} {
			color: ${props => getButtonColor(props).active.text};
		}
	}
`;

export type Props = {
	isDisabled?: boolean,
	icon?: React.Element<typeof Icon19>,
	label?: React.Node,
	labelPosition?: 'before' | 'after',
	isSmall?: boolean,
	tag?: 'a' | 'button',
	onClick?: mixed,
	variant?: 'primary' | 'secondary' | 'tertiary' | 'primaryDark' | 'secondaryDark' | 'tertiaryDark' | 'toggleActive' | 'toggleInactive',
	isDropdownTrigger?: boolean,
	isUpwardsDropdownTrigger?: boolean,
	isDropdownOpen?: boolean
};

const Button19 = (props: Props) => {
	const {
		icon,
		isDisabled,
		label = '',
		labelPosition = 'before',
		isSmall = false,
		tag = 'button',
		variant = 'primary',
		isDropdownTrigger,
		isUpwardsDropdownTrigger,
		isDropdownOpen,
		...rest
	} = props;

	return (
		<EnsureDefaultTheme>
			<ButtonWrapper as={tag} variant={variant} isSmall={isSmall} isDisabled={isDisabled} {...rest}>
				{labelPosition === 'after' && icon}
				{label && <Label isSmall={isSmall}>{label}</Label>}
				{labelPosition === 'before' && icon}
				{isDropdownTrigger && (
					isDropdownOpen ? <ChevronUp /> : <ChevronDown />
				)}
				{isUpwardsDropdownTrigger && (
					isDropdownOpen ? <ChevronDown /> : <ChevronUp />
				)}
			</ButtonWrapper>
		</EnsureDefaultTheme>
	);
};

export default Button19;