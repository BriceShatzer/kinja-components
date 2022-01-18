/* @flow */

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';

/* flow */
type Props = {
	value: *,
	selected?: boolean,
	stringRepresentation: string,
	ga?: string
};
/* /flow */

/* styled-components */
export const OptionItem = styled.div`
	padding: 5px 9px;
	color: ${props => props.theme.color.darksmoke};
	font-size: 0.9em;
	cursor: pointer;
	outline: none;

	&:hover {
		background: ${props => props.theme.color.whitesmoke};
	}

	${ props => props.selected && `background: ${props.theme.color.whitesmoke};` }
`;
/* /styled-components */

const Option = (props: Props) => (
	<EnsureDefaultTheme>
		<span data-ga={props.ga}>{props.stringRepresentation}</span>
	</EnsureDefaultTheme>
);

export default Option;
