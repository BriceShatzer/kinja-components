// @flow

// Main kinja container housing layout components like the sidebar and the main content area

import type { ComponentType } from 'react';
import styled, { css } from 'styled-components';

import media from '../../style-utils/media';
import { MainContent, MainWrapper } from './main.v2';
import { SidebarWrapper } from './sidebar';

const Page: ComponentType<{featured?: boolean}> = styled.div`
	${media.xlargeUp`
		max-width: ${props => props.featured ? 'none' : props.theme.pageWidth};
		margin: 0 auto;
		width: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
	`}

	${props => props.featured && css`
		${MainContent} {
			max-width: none;
			padding-top: 0;
		}

		${MainWrapper} {
			float: none;
			border: 0;
			width: 100%;
			margin: 0 auto;
		}

		${SidebarWrapper} {
			display: none;
		}
	`}
`;

export default Page;
