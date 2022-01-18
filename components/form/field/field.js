// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from '../../theme';
import Counter from './counter';

type Props = {
	children: React.Node,
	label?: string,
	value?: string,
	error?: string,
	counter?: boolean,
	limit?: number,
	fullWidth?: boolean
}

export const Wrapper = styled.label`
	position: relative;
	margin-bottom: 1.5rem;
	display: block;
	width: 100%;

	${props => props.fullWidth ? '' : css`
		max-width: 400px;
	`}
`;

const Label = styled.div`
	font-size: 0.875rem;
	transition: color 0.2s ease-in-out;
	color: ${props => props.theme.color.gray};
	line-height: 23px;
	margin-bottom: -5px;
`;

const Error = styled(Label)`
	color: ${props => props.theme.color.alert};
`;
Error.displayName = 'field_Error';

const labelOrError = (label, error) => {
	if (error) {
		return (<Error>{error}</Error>);
	} else if (label) {
		return (<Label>{label}</Label>);
	} else {
		return null;
	}
};

const Field = (props: Props) => {
	const { children, label, value, limit, counter, fullWidth } = props;
	const error = (counter && limit && value && value.length > limit) ? `Maximum char limit (${limit}) reached.` : props.error;

	return (
		<EnsureDefaultTheme>
			<Wrapper className="field" fullWidth={fullWidth}>
				{children}
				{labelOrError(label, error)}
				{counter && <Counter value={value} />}
			</Wrapper>
		</EnsureDefaultTheme>
	);
};

export default Field;
