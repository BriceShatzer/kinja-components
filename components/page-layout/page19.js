// @flow

// Main kinja container housing layout components like the sidebar and the main content area.
// This version supports Grid19, with the sidebar spanning 4 columns and the main content spanning 8 columns on desktop.

import styled, { css } from 'styled-components';

import media from '../../style-utils/media';
import { gridValue } from '../grid-utils';
import { MainContent, MainWrapper } from './main';
import { SidebarWrapper, SidebarModule } from './sidebar';
import { FeedStreamContainer } from '../stream-new/feed-stream-container';

const Page19 = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;

	${MainContent} {
		max-width: none;
		padding-top: 32px;
	}

	${MainWrapper} {
		padding: 0;

		${media.smallOnly`
			width: ${gridValue.small('6c')};
		`}

		${media.mediumOnly`
			width: ${gridValue.medium('6c')};
		`}

		${media.largeOnly`
			width: ${gridValue.large('8c')};
		`}

		${media.xlargeOnly`
			width: ${gridValue.xlarge('8c')};
		`}

		${props => props.wideRail ? css`
			${media.xxlargeOnly`
				width: ${gridValue.xxlarge('8c')};
			`}
			${media.xxxlargeUp`
				width: ${gridValue.xxxlarge('8c')};
			`}
		` : css`
			${media.xxlargeUp`
				width: ${gridValue.xxlarge('8c')};
			`}
		`}
	}

	${SidebarWrapper} {
		padding: 0;

		${media.largeDown`
			display: none;
		`}

		${media.xlargeOnly`
			margin-left: ${gridValue.xlarge('0.5g')};
			padding-left: ${gridValue.xlarge('0.5g')};
			width: ${gridValue.xlarge('4c0.5g')};
		`}

		${props => props.wideRail ? css`
			${media.xxlargeOnly`
				margin-left: ${gridValue.xxlarge('0.5g')};
				padding-left: ${gridValue.xxlarge('0.5g')};
				width: ${gridValue.xxlarge('4c0.5g')};
			`}
			${media.xxxlargeUp`
				margin-left: ${gridValue.xxxlarge('0.5g')};
				padding-left: ${gridValue.xxxlarge('0.5g')};
				width: ${gridValue.xxxlarge('4c0.5g')};
			`}
		` : css`
			${media.xxlargeUp`
				margin-left: ${gridValue.xxlarge('0.5g')};
				padding-left: ${gridValue.xxlarge('0.5g')};
				width: ${gridValue.xxlarge('4c0.5g')};
			`}
		`}
	}

	${SidebarModule} {
		max-width: none;
	}

	/*
		TEMP HACK: it's probably better if FeedStreamContainer sets its own padding,
		but this is quicker while we're switching the previous layouts and the new grid,
		this way we don't need to check for the value of the relevant fs in the FeedStream components.
	*/
	${FeedStreamContainer} {
		padding: 0;

		${media.xlargeOnly`
			width: ${gridValue.xlarge('7c')};
			margin-left: ${gridValue.xlarge('1c1g')};
		`}

		${media.xxlargeUp`
			width: ${gridValue.xxlarge('7c')};
			margin-left: ${gridValue.xxlarge('1c1g')};
		`}

		${props => props.wideRail ? css`
			${media.xxlargeOnly`
				width: ${gridValue.xxlarge('7c')};
				margin-left: ${gridValue.xxlarge('1c1g')};
			`}
			${media.xxxlargeUp`
				width: ${gridValue.xxxlarge('7c')};
				margin-left: ${gridValue.xxxlarge('1c1g')};
			`}
		` : css`
			${media.xxlargeUp`
				width: ${gridValue.xxlarge('7c')};
				margin-left: ${gridValue.xxlarge('1c1g')};
			`}
		`}
	}
`;

export default Page19;
