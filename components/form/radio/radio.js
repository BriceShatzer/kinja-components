// @flow

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';


export const Checkmark = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	width: 23px;
	height: 23px;
	padding: 4px;
	border-radius: 50%;
	border: 1px solid ${({ theme }) => theme.color.gray};

	&::after {
		content: '';
		position: absolute;
		top: 4px;
		right: 4px;
		bottom: 4px;
		left: 4px;
		display: block;
		background-color: ${({ theme }) => theme.color.white};
		z-index: -1;
		border-radius: 50%;
	}
`;

export const Input = styled.input.attrs({ type: 'radio' })`
	position: absolute;
	opacity: 0;
	cursor: pointer;

	&:checked ~ ${Checkmark} {
		border-color: ${({ theme }) => theme.color.darkgray};

		&::after {
			background-color: ${({ theme }) => theme.color.darkgray};
		}
	}
`;

export const Label = styled.div`
	position: relative;
	top: 3px;
	display: block;
	color: ${({ theme }) => theme.color.darkgray};
	font-size: 16px;
	line-height: 21px;
`;

export const InlineHelp = styled.div`
	display: block;
	margin-top: 4px;
	font-size: 14px;
	line-height: 18px;
	color: ${({ theme }) => theme.color.gray};
`;

export const Wrapper = styled.label`
	display: block;
	position: relative;
	padding-left: 33px;
	cursor: pointer;
	user-select: none;

	:hover {
		cursor: pointer;

		${Input} ~ ${Checkmark} {
			border-color: ${({ theme }) => theme.color.darksmoke};
		}

		${Input}:checked ~ ${Checkmark} {
			::after {
				background-color: ${({ theme }) => theme.color.darksmoke};
			}
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
		::after {
			background-color: ${({ theme }) => theme.color.primary};
		}
	}
`;


type Props<ValueType> = {
	checked?: boolean,
	inlineHelp?: string,
	label: string,
	name?: string,
	onClick?: ValueType => void,
	value: ValueType
}

export default function Radio<ValueType>({
	checked,
	inlineHelp,
	label,
	name,
	onClick,
	value
}: Props<ValueType>) {
	return (
		<EnsureDefaultTheme>
			<Wrapper htmlFor={value} onClick={() => onClick && onClick(value)}>
				<Input id={value} name={name} value={value} checked={checked} readOnly />
				<Checkmark />
				<Label>{label}</Label>
				{inlineHelp && <InlineHelp>{inlineHelp}</InlineHelp>}
			</Wrapper>
		</EnsureDefaultTheme>
	);
}
