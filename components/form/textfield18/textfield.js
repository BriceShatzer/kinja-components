/* @flow */

import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import styled, { css } from 'styled-components';
import { darken } from 'polished';

import { Theme } from 'kinja-components/components/theme';
import Icon19 from 'kinja-components/components/icon19/icon19';
import Loading from 'kinja-components/components/icon19/Loading';
import { StyledFeedback } from 'kinja-components/components/elements/feedback';
import Field from '../field';
import { Span as Counter } from '../field/counter';

import type { BlogThemeName } from 'kinja-components/components/theme/theme';

export type OnChangeCallback = (value: string, target: HTMLInputElement) => void;

export type Props = {
	autoGrow?: boolean,
	blogTheme: BlogThemeName,
	className?: string,
	counter?: boolean,
	customIcon?: React.Element<typeof Icon19>,
	disabled?: boolean,
	error?: string,
	forcedActiveStyle?: boolean,
	inlineHelp?: string,
	inputRef?: React.Ref<'input'>,
	label?: string,
	limit?: number,
	name: string,
	onChange?: OnChangeCallback,
	type?: string,
	status?: 'default' | 'loading', // todo: merge status with error and disabled
	value?: string,
	onIconClick?: () => void
};

/**
 * Returns the appropriate color for the component's state.
 * Disabled state takes precedency over error state.
 */
const triStateColor = (props, defaultColor: string, errorColor?: string): string => {
	const { disabled, error } = props;

	if (disabled) {
		return props.theme.color.midgray;
	}
	if (error) {
		return errorColor || props.theme.color.error;
	}

	return defaultColor;
};

export const KinjaLabel = styled.label`
	&& {
		/* overwriting default styles */
		color: ${props => triStateColor(props, props.theme.color.darkgray)};
		font-size: 16px;
		line-height: 21px;
	}
`;

export const KinjaFormFieldWrapper = styled.div`
	margin-bottom: 32px;
	flex-basis: 100%;

	&:hover {
		${KinjaLabel} {
			color: ${props => triStateColor(props, props.theme.color.bodytext, darken(0.1, props.theme.color.error))};
		}
	}

	&:focus-within {
		${KinjaLabel} {
			color: ${props => props.theme.color.primary};
		}
	}

	${({ forcedActiveStyle, theme }) => forcedActiveStyle && css`
		${KinjaLabel} {
			color: ${theme.color.primary};
		}
	`}

	${StyledFeedback} {
		margin-top: 8px;
	}
`;

const KinjaTextFieldStyle = css`
	&& {
		/* double ampersand selector is used to overwrite non-React (Foundation + Mantle) styles, remove once unnecessary */
		border-bottom: 1px solid ${props => triStateColor(props, props.theme.color.secondarytext)};
		color: ${props => props.theme.color.bodytext} !important;
		font-size: 18px;
		line-height: 23px;
		padding: 6px 0;
		width: 100%;
	}

	&&&:hover,
	&&&:active,
	&&&:focus {
		/* double ampersand selector is used to overwrite non-React (Foundation + Mantle) styles, remove once unnecessary */
		color: ${props => props.theme.color.bodytext};
	}

	&:hover {
		border-bottom-color: ${props => props.error ? darken(0.1, props.theme.color.error) : props.theme.color.darkgray};
	}

	&&&:focus,
	&&&:active {
		/* double ampersand selector is used to overwrite non-React (Foundation + Mantle, _forms.scss) styles, remove once unnecessary */
		border-bottom-color: ${props => props.error ? props.theme.color.error : props.theme.color.primary};
	}

	&:disabled {
		border-bottom-color: ${props => props.theme.color.midgray};
		cursor: not-allowed;
	}
`;

export const KinjaTextField = styled.input`
	${KinjaTextFieldStyle};
`;

export const KinjaTextFieldAutoGrow = styled(AutosizeInput)`
	${KinjaTextFieldStyle};
	transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;

	input {
		font-size: 18px;
		padding: 0;
	}
`;

export const KinjaTextFieldWrapper = styled.div`
	position: relative;

	&:hover {
		border-bottom-color: ${props => props.error ? darken(0.1, props.theme.color.error) : props.theme.color.darkgray};
	}

	&:hover &:focus,
	&:hover &:active {
		border-bottom-color: ${props => props.theme.color.primary};
	}

	&:hover &:disabled {
		border-bottom-color: ${props => props.theme.color.midgray};
		cursor: not-allowed;
	}

	${KinjaTextFieldAutoGrow} {
		padding: 0;
		${props => props.forcedActiveStyle && css`
			border-bottom-color: ${props.theme.color.primary} !important;
		`}
	}

	${KinjaTextField},
	${KinjaTextFieldAutoGrow} {
		${props => ((props.status !== 'default') || props.hasCustomIcon) && 'padding-right: 26px;'}
		${props => (props.status !== 'default') && props.hasCustomIcon && 'padding-right: 52px;'}
	}

	${Counter} {
		top: 9px;
	}
`;

export const KinjaInlineHelp = styled.p`
	&& {
		/* double ampersand selector is used to overwrite non-React (Foundation + Mantle) styles, remove once unnecessary */
		color: ${props => triStateColor(props, props.theme.color.secondarytext)};
		font-size: 14px;
		line-height: 18px;
		margin-bottom: 0;
		margin-top: 6px;
	}
`;

const IconBar = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	height: 100%;
	display: flex;
	align-items: center;
`;

const IconWrapper = styled.div`
	:not(:last-of-type) {
		margin-right: 0.5rem;
	}
`;

const Textfield18 = (props: Props) => {
	const { autoGrow, blogTheme, className, counter, customIcon, disabled, error,
		forcedActiveStyle, inlineHelp, inputRef, label, limit, name, onChange,
		status = 'default', type = 'text', value, onIconClick, ...rest } = props;
	const textFieldProps = {
		...rest,
		disabled,
		error,
		id: name,
		name,
		ref: inputRef,
		type,
		value
	};

	const textfield = autoGrow ? (
		<KinjaTextFieldAutoGrow {...textFieldProps}
			style={{ display: 'block' }}
			status={status}
			onChange={event => {
				if (onChange) {
					onChange(event.target.value, event.target);
				}
			}}
		/>
	) : (
		<KinjaTextField {...textFieldProps}
			status={status}
			onChange={event => {
				if (onChange) {
					onChange(event.target.value, event.target);
				}
			}}
		/>
	);

	return (
		<Theme blog={blogTheme}>
			<KinjaFormFieldWrapper className={className} forcedActiveStyle={forcedActiveStyle}>
				<KinjaLabel
					htmlFor={name}
					disabled={disabled}
					error={error}>
					{label}
				</KinjaLabel>
				<KinjaTextFieldWrapper status={status} hasCustomIcon={!!customIcon} forcedActiveStyle={forcedActiveStyle}>
					{counter ? (
						<Field value={value} counter={counter} limit={limit} fullWidth>
							{textfield}
						</Field>
					) : textfield}
					{(customIcon || status !== 'default') && <IconBar>
						{status === 'loading' && <IconWrapper><Loading /></IconWrapper>}
						{customIcon && <IconWrapper onClick={onIconClick}>{ customIcon }</IconWrapper>}
					</IconBar>}
				</KinjaTextFieldWrapper>
				{error && <StyledFeedback text={error} color='error' arrow='topleft' />}
				{inlineHelp && <KinjaInlineHelp disabled={disabled}>{inlineHelp}</KinjaInlineHelp>}
			</KinjaFormFieldWrapper>
		</Theme>
	);
};

Textfield18.defaultProps = {
	blogTheme: 'default'
};


export default Textfield18;
