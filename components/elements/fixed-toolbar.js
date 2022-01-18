/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

const FixedFlex = styled.div`
	position: fixed;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
	display: flex;
	align-items: center;
	justify-content: center;
	bottom: 0;
	left: 0;
	padding: ${props => props.theme.columnPadding};
	border-top: 1px solid ${props => props.theme.color.lightgray};
	width: 100%;
	background: ${props => props.theme.color.white};
	z-index: 1000;
	${
	media.smallOnly`
	justify-content: space-around;
		button {
			padding: 0 1.5rem;
		}
	`}
`;

const FixedToolbar = (props: { children: * }) =>
	<EnsureDefaultTheme>
		<FixedFlex>{props.children}</FixedFlex>
	</EnsureDefaultTheme>;

export default FixedToolbar;
