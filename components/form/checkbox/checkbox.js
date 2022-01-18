// @flow

import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../../theme';
import CheckMarkIcon from '../../icon19/Checkmark';
import { StyledFeedback } from 'kinja-components/components/elements/feedback';
import type { BlogThemeName } from 'kinja-components/components/theme/theme';

export type CheckboxProps = {
	blogTheme?: BlogThemeName,
	checked?: boolean,
	error?: string,
	inlineHelp?: string,
	label?: string,
	name?: string,
	onChange ?: (SyntheticInputEvent<HTMLInputElement>) => void,
	value?: string
}

const Checkmark = styled.span`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	height: 25px;
	width: 25px;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.color.gray};

	svg {
		color: ${({ theme }) => theme.color.white};
		position: relative;
		width: 15px;
		height: 15px;
		display: block;
		opacity: 0;
	}
`;

const Label = styled.div`
	position: relative;
	top: 3px;
	color: ${({ theme }) => theme.color.darkgray};
	font-size: 16px;
	line-height: 21px;
`;

const Input = styled.input.attrs({
	type: 'checkbox'
})`
	position: absolute;
	opacity: 0;
	cursor: pointer;

	&&& {
		margin: 0 4px 0 0;
	}

	:checked ~ ${Checkmark} {
		border-color: ${({ theme }) => theme.color.darkgray};
		background-color: ${({ theme }) => theme.color.darkgray};

		svg {
			opacity: 1;
		}
	}
`;

export const Wrapper = styled.label`
	font-size: 16px;
	line-height: 21px;
	margin-bottom: 16px;
	min-height: 25px;
	padding-left: 33px;
	position: relative;
	cursor: pointer;
	user-select: none;

	:hover {
		cursor: pointer;

		${Input} ~ ${Checkmark} {
			border-color: ${({ theme }) => theme.color.darksmoke};
		}

		${Input}:checked ~ ${Checkmark} {
			background-color: ${({ theme }) => theme.color.darksmoke};
		}

		${Label} {
			color: ${({ theme }) => theme.color.darksmoke};
		}
	}

	${Input}:focus ~ ${Label},
	${Input}:active ~ ${Label} {
		color: ${({ theme }) => theme.color.primary};
	}

	${Input}:focus ~ ${Checkmark},
	${Input}:active ~ ${Checkmark} {
		border-color: ${({ theme }) => theme.color.primary};
	}

	${Input}:checked:focus ~ ${Checkmark},
	${Input}:checked:active ~ ${Checkmark} {
		background-color: ${({ theme }) => theme.color.primary};
	}

	${StyledFeedback} {
		margin-top: 0.5rem;
	}
`;

const InlineHelp = styled.div`
	margin-top: 4px;
	font-size: 14px;
	line-height: 18px;
	color: ${({ theme }) => theme.color.gray};
`;


const Checkbox = ({
	blogTheme = 'default',
	checked = false,
	error = '',
	inlineHelp,
	label = '',
	name = '',
	onChange,
	value = ''
}: CheckboxProps) => (
	<Theme blog={blogTheme}>
		<Wrapper>
			<Input name={name} value={value} checked={checked} onChange={onChange}/>
			<Checkmark><CheckMarkIcon /></Checkmark>
			<Label>{label}</Label>
			{error && <StyledFeedback text={error} color='error' arrow='topleft' />}
			{inlineHelp && <InlineHelp>{inlineHelp}</InlineHelp>}
		</Wrapper>
	</Theme>
);

export default Checkbox;
