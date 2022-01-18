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
	`}
`;

export const MainContent = styled.div`
	width: 100%;
	max-width: ${props => props.theme.mainContentMaxWidth};
	padding-bottom: 40px;

	${media.largeUp`
		padding-top: 31px;
	`}
	${media.mediumDown`
		padding-top: ${props => props.theme.columnPadding};
	`}
	margin: 0 auto;
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
