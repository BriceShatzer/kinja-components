/* @flow */

import * as React from 'react';
import Icon19, { IconWrapper } from '../icon19/icon19';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

type Sort = 'circle' | 'share' | 'social';

export type Props = {
	iconName?: string,
	disabled?: boolean,
	fullwidth?: boolean,
	halfwidth?: boolean,
	icon?: React.Element<typeof Icon19>,
	sort?: Sort,
	label?: React.Node,
	labelPosition?: 'before' | 'after',
	small?: boolean,
	variant?: 'amazon' | 'commerce' | 'error' | 'facebook' | 'google' | 'twitter' | 'instagram' | 'youtube' | 'rss' | 'primary',
	weight?: 'primary' | 'secondary' | 'tertiary' | 'tertiary-dark',
	onClick?: mixed
};

// functions to pick the decent values for different button variants
const isSocialIcon = ({ sort, variant }) => {
	return sort === 'circle' && ['facebook', 'twitter', 'instagram', 'youtube', 'rss'].includes(variant);
};

const getWidth = ({ fullwidth, halfwidth, sort, small }) => {
	if (fullwidth) { return '100%'; }
	if (halfwidth) { return '50%'; }
	if (sort === 'circle') { return small ? '34px' : '42px'; }
	if (sort === 'social') { return '260px'; }
	return 'auto';
};

export const getHeight = ({ sort, small }: {sort: Sort, small: boolean}) => {
	if (small) { return '34px'; }
	if (sort === 'share') { return '28px'; }
	return '42px';
};

const getPadding = ({ sort, size }) => {
	if (sort === 'circle') { return '0'; }
	if (sort === 'share') { return '0 16px 0 14px'; }
	if (size === 'small') { return '0 1.5rem'; }
	return '0 2rem';
};

const getBorderColor = ({ isDisabled, sort, variant, weight }) => {
	if (weight === 'secondary' && isDisabled) { return 'midgray'; }
	if (weight === 'secondary' && variant) { return variant; }
	if (sort === 'social') { return 'gray'; }
	if (weight === 'secondary') { return 'primary'; }
	if (weight === 'tertiary') { return 'gray'; }
};

const getBorderRadius = ({ small, sort, fullwidth, halfwidth }) => {
	if (small) { return '34px'; }
	if (fullwidth) { return '0'; }
	if (halfwidth) { return '0'; }
	if (sort === 'circle') { return '50%'; }
	if (sort === 'share') { return '14px'; }
	return '21px';
};

const getTextColor = ({ isDisabled, sort, variant, weight }) => {
	if (sort === 'social') { return 'white'; }
	if (weight === 'secondary' && isDisabled) { return 'midgray'; }
	if (weight === 'primary' && variant === 'amazon') { return 'black'; }
	if (weight === 'secondary' && variant) { return variant; }
	if (weight === 'secondary') { return 'primary'; }
	if (weight === 'tertiary') { return 'darkgray'; }
	if (weight === 'tertiary-dark') { return 'darkgray'; }
	return 'white';
};

const getLineHeight = ({ small, sort }) => {
	if (small) { return '34px'; }
	if (sort === 'share') { return '28px'; }
	return '42px';
};

const getBackgroundColor = ({ isDisabled, sort, variant, weight }) => {
	if (weight === 'primary' && isDisabled) { return 'lightgray'; }
	if (weight === 'primary' && variant) { return variant; }
	if (weight === 'primary') { return weight; }
	if (sort === 'social' && variant) { return variant; }
	return 'white';
};

// styled components
export const Label = styled.span`
	display: flex;

	+ svg,
	+ ${IconWrapper} {
		margin-left: 4px;
	}
`;

export const ButtonInner = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	width: 100%;
	white-space: nowrap;
	pointer-events: none;

	svg {
		${props => props.sort === 'share' && css`
			svg {
				width: 14px;
				height: 14px;
				opacity: 1;
				margin-top: -3px;
			}
		`}

		+ span {
			margin-left: 4px;
		}
	}

	${IconWrapper} {
		+ span {
			margin-left: 4px;
		}
	}
`;

/* eslint-disable max-len */
export const ButtonWrapper = styled.button`
	width: ${props => getWidth(props)};
	height: ${props => getHeight(props)};
	padding: ${props => getPadding(props)};
	border: transparent 1px solid;
	border-radius: ${props => getBorderRadius(props)};
	border-color: ${props => props.weight === ('primary' || 'tertiary-dark') || props.sort === 'social' ? 'transparent' : props.theme.color[getBorderColor(props)]};
	color: ${props => props.theme.color[getTextColor(props)]};
	font-size: ${props => props.small || props.sort === 'share' ? '14px' : '1rem'};
	text-align: ${props => props.sort === 'social' ? 'left' : 'center'};
	line-height: ${props => getLineHeight(props)};
	background-color: ${props => props.theme.color[getBackgroundColor(props)]};
	transition: ${props => props.sort === 'share' ? 'none' : 'background-color 0.2s ease-out, border-color 0.2s ease-out, color 0.2s ease-out'};
	${props => props.isDisabled && 'cursor: not-allowed;'};
	${props => props.margin && `margin: ${props.margin}` };

	${ButtonInner} > svg {
		margin-bottom: 2px;
		${props => props.weight === 'primary' && props.variant === 'primary' && `stroke: ${props.theme.color[getTextColor(props)]};`}
		${props => props.weight === 'primary' && props.sort !== 'circle' && props.isDisabled && `stroke: ${props.theme.color[getTextColor(props)]};`}
		${props => props.weight === 'secondary' && props.isDisabled && `stroke: ${props.theme.color[getTextColor(props)]};`}
		${props => props.weight === 'tertiary' && `stroke: ${props.theme.color[getTextColor(props)]};`}
		${props => props.sort === 'social' && `width: 28px; text-align: left; fill: ${props.theme.color[getTextColor(props)]};`}
		${props => props.sort === 'share' && 'width: 24px; text-align: left;'}
	}

	${IconWrapper} {
		margin-bottom: 2px;
	}

	&:hover,
	&:active,
	&:focus {
		color: ${props => darken(props.weight === 'primary' || props.isDisabled ? 0 : 0.2, props.theme.color[getTextColor(props)])};
		border-color: ${props => props.weight === 'primary' || props.weight === 'tertiary-dark' || props.sort === 'social' ? 'transparent' : darken(props.isDisabled ? 0 : 0.2, props.theme.color[getBorderColor(props)])};
		background-color: ${props => darken(props.weight === 'primary' && !props.isDisabled || props.sort === 'social' ? 0.1 : 0, props.theme.color[getBackgroundColor(props)])};
		${props => props.sort === 'share' && `background-color: ${props.theme.color[getBackgroundColor(props)]};`}

		/* button group style */
		${props => props.active && css`
			+ ${ButtonWrapper} {
				border-left: 1px solid ${darken(0.1, props.theme.color.primary)};
			}
		`}

		${ButtonInner} > svg {
			${props => !isSocialIcon(props) && css`
				stroke: ${darken(props.weight === 'primary' || props.isDisabled ? 0 : 0.1, props.theme.color[getTextColor(props)])};
			`}
			${props => props.sort === 'circle' && props.weight === 'secondary' && css`
				fill: ${props => darken(0.1, props.theme.color.primary)};
				stroke: none;
			`}
			${props => props.sort === 'social' && css`
				stroke: none;

				&[name="burner"] {
					stroke: ${props => props.theme.color.black};
				}
			`}
			${props => props.sort === 'share' && 'stroke: none;'}
		}
	}

	${media.mediumDown`
		${props => props.sort === 'share' && css`
			width: 120px;
			padding: 0;
		`}
	`}
`;
/* eslint-enable max-len */

const Button = (props: Props) => {
	const {
		disabled,
		icon,
		label = '',
		labelPosition = 'before',
		weight = 'primary',
		...rest
	} = props;

	return (
		<EnsureDefaultTheme>
			<ButtonWrapper weight={weight} isDisabled={disabled} disabled={disabled} {...rest}>
				<ButtonInner>
					{labelPosition === 'after' && icon}
					{label && <Label>{label}</Label>}
					{labelPosition === 'before' && icon}
				</ButtonInner>
			</ButtonWrapper>
		</EnsureDefaultTheme>
	);
};

export default Button;
