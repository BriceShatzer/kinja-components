// @flow

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

export const MainWrapper = styled.main`
	padding: 0 ${props => props.theme.columnPadding};

	${media.xlargeUp`
		width: ${props => props.theme.mainContainerWidth};
		order: 1;
		padding: 0;
	`}
`;

export const MainContent = styled.div`
	width: 100%;
	margin: 0 auto;
	padding-top: 40px;
	${media.mediumUp`
		padding: 40px;
	`}
`;

const Main = ({ children }: {
	children: React.Node
}) =>
	<EnsureDefaultTheme>
		<MainWrapper>
			<MainContent>
				{children}
			</MainContent>
		</MainWrapper>
	</EnsureDefaultTheme>;

export default Main;
