// @flow

import React from 'react';
import styled, { css } from 'styled-components';
import { gridValue } from './';
import media from 'kinja-components/style-utils/media.js';

export const range = (start: number, end: number) =>
	// $FlowFixMe
	new Array(end - start + 1)
		.fill(undefined)
		.map((_, i: number) => i + 1);

const GridOverlayWrapper = styled.div`
	pointer-events: none;
	z-index: 9999;
	position: ${({position}) => position};
	${({asBackground}) => asBackground ? 'z-index: -1;' : ''}
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`;

const GridOverlayColumn = styled.div`
	height: 100%;
	background: red;
	flex: none;
`;

const GridOverlayContainer = styled.div`
	display: flex;
	overflow: hidden;
	height: 100%;
	margin-right: auto;
	margin-left: auto;
	opacity: 0.1;

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
		width: ${gridValue.xlarge('12c')};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			width: ${gridValue.xxlarge('12c')};
		`}
		${media.xxxlargeUp`
			width: ${gridValue.xxxlarge('12c')};
		`}
	` : css`
		${media.xxlargeUp`
			width: ${gridValue.xxlarge('12c')};
		`}
	`}

	${GridOverlayColumn} {
		${media.smallOnly`
			width: ${gridValue.small('1c')};
			margin-right: ${gridValue.small('1g')};
		`}

		${media.mediumOnly`
			width: ${gridValue.medium('1c')};
			margin-right: ${gridValue.medium('1g')};
		`}

		${media.largeOnly`
			width: ${gridValue.large('1c')};
			margin-right: ${gridValue.large('1g')};
		`}

		${media.xlargeOnly`
			width: ${gridValue.xlarge('1c')};
			margin-right: ${gridValue.xlarge('1g')};
		`}

		${props => props.wideRail ? css`
			${media.xxlargeOnly`
				width: ${gridValue.xxlarge('1c')};
				margin-right: ${gridValue.xxlarge('1g')};
			`}
			${media.xxxlargeUp`
				width: ${gridValue.xxxlarge('1c')};
				margin-right: ${gridValue.xxxlarge('1g')};
			`}
		` : css`
			${media.xxlargeUp`
				width: ${gridValue.xxlarge('1c')};
				margin-right: ${gridValue.xxlarge('1g')};
			`}
		`}
	}
`;

type GridOverlayProps = {
	position?: 'absolute' | 'fixed',
	asBackground?: boolean,
	wideRail?: boolean
}

export const GridOverlay = ({
	position = 'absolute',
	asBackground = true,
	wideRail = false
}: GridOverlayProps) => (
	<GridOverlayWrapper position={position} asBackground={asBackground}>
		<GridOverlayContainer wideRail={wideRail}>
			{range(1, 12).map(key => (
				<GridOverlayColumn key={key} />
			))}
		</GridOverlayContainer>
	</GridOverlayWrapper>
);
