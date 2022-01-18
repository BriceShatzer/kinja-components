/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

export const ToolbarWrapper = styled.ul`
	background-color: ${({ theme }) => theme.color.white};
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
	border: 1px solid ${({ theme }) => theme.color.gray};
	border-radius: 3px;
	margin: 0;
	padding: 2px 4px;
	display: ${({ display }) => (display ? display : 'block')};

	li {
		display: inline-block;

		a {
			align-items: center;
			display: flex;
			justify-content: center;
		}
	}

	* {
		outline: none;
	}
`;

type Props = {
	children: React.ChildrenArray<React.Element<any>>,
	display?: 'block' | 'inline-block' | 'flex',
	className?: string
};

const FloatingToolbar = (props: Props) => {
	const { children, display, className } = props;
	return (
		<EnsureDefaultTheme>
			<ToolbarWrapper className={className} display={display}>
				{React.Children.map(children, child => <li key={child.props.title}>{child}</li>)}
			</ToolbarWrapper>
		</EnsureDefaultTheme>
	);
};

export default FloatingToolbar;
