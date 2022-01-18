// @flow

// Main kinja container housing layout components like the sidebar and the main content area

import type { ComponentType } from 'react';
import styled, { css } from 'styled-components';
import { gridValue } from '../grid-utils';

import media from '../../style-utils/media';
import { MainContent, MainWrapper } from './main';
import { SidebarWrapper, SidebarAdModule } from './sidebar';

const Page: ComponentType<{featured?: boolean}> = styled.div`
	${media.xlargeUp`
		max-width: ${props => props.featured ? 'none' : props.theme.pageWidth};
		margin: 0 auto;
		width: 100%;
		display: flex;
		flex-flow: ${props => props.featured ? 'column' : 'row nowrap'};
		justify-content: ${props => props.featured ? 'center' : 'flex-end'};

		${props => props.featured && css`
			align-items: center;
		`}
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

	${props => props.fullWidthHeadline && css`
		${MainContent} {
			padding-top: 0;
		}

		${SidebarWrapper} {
			${SidebarAdModule}:first-child [data-ad-load-state=loaded] {
				padding-top: 0;
			}
		}
	`}
`;

export const FullWidthHeadlineContainer = styled.div`
	position: relative;
	padding: ${props => props.withStandardGrid ? '1.5rem 0 0' : '1.5rem 1.125rem 1rem'};
	margin: 0 auto;

	h1 {
		margin-bottom: 0;
	}

	${media.largeDown`
		${props => !props.withStandardGrid && 'max-width: 800px;'}
		box-sizing: content-box;
	`}

	${media.xlargeUp`
		max-width: ${props => props.featured ? 'none' : props.theme.pageWidth};

		&& h1 {
			max-width: ${props => props.featured ? 'none' : `calc(${props.theme.pageWidth} * 0.8)`};
			font-size: 52px;
			line-height: 64px;
		}
	`}

	/* Align headline with post body. Remove once permalink is aligned to grid. */
	@media only screen and (min-width: 1260px) and (max-width: 1363px) {
		padding-left: ${props => props.featured ? 0 : 'calc((66.5% - 800px) / 2)'};
		margin: 0;
		${props => props.withStandardGrid && 'padding-left: 0;'}
		${props => props.withStandardGrid && 'margin: 0 auto;'}
	}

	${media.smallOnly`
		${props => props.withStandardGrid && `max-width: ${gridValue.small('6c')};`}
	`}

	${media.mediumOnly`
		${props => props.withStandardGrid && `max-width: ${gridValue.medium('6c')};`}
	`}

	${media.largeOnly`
		${props => props.withStandardGrid && `max-width: ${gridValue.large('8c')};`}
	`}

	${media.xlargeOnly`
		${props => props.withStandardGrid && `max-width: ${gridValue.xlarge('12c')};`}
	`}

	${media.xxlargeUp`
		padding-left: ${props => props.featured ? 0 : `calc(((${props.theme.pageWidth} * 0.665) - 800px) / 2)`};
		${props => props.withStandardGrid && 'padding-left: 0;'}
		${props => props.withStandardGrid && `max-width: ${gridValue.xxlarge('12c')};`}
	`}

	${props => (props.withWideRail && props.withStandardGrid) && css`
		${media.xxxlargeUp`
			max-width: ${gridValue.xxxlarge('12c')};
		`}
	`}
`;


export default Page;
