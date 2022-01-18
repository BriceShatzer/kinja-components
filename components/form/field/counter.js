// @flow

import * as React from 'react';
import styled from 'styled-components';

type Props = {
	value?: string
};

export const Span = styled.span`
	position: absolute;
	top: 0;
	right: 0;
	color: ${props => props.theme.color.midgray};
`;

const Counter = ({ value }: Props) => (
	<Span>{value ? value.length : 0}</Span>
);

export default Counter;