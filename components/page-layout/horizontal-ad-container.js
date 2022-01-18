// @flow

// Wide ad container made to be rendered between page sections. Check ./README.md for an example

import * as React from 'react';
import type { ComponentType } from 'react';
import styled, { css } from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import media from '../../style-utils/media';

type AdPosition = 'top' | 'center' | 'bottom';

const styleBasedOnPosition = (position: AdPosition) => {
	switch (position) {
		case 'top':
			return css`
				& [data-ad-load-state=loaded] {
					border-bottom: 1px solid ${props => props.theme.color.lightgray};
					padding: 20px 0;
				}

				@media only screen and (max-width: ${props => props.theme.breakpointBanner}) {
					display: none;
				}
			`;
		case 'center':
			return css`
				& [data-ad-load-state=loaded] {
					border-top: 3px solid ${props => props.theme.color.logo};
					border-bottom: 1px solid ${props => props.theme.color.lightgray};
					padding: 20px 0;
				}
			`;
		case 'bottom':
			return css`
				& [data-ad-load-state=loaded] {
					border-top: 1px solid ${props => props.theme.color.lightgray};
					border-bottom: 1px solid ${props => props.theme.color.lightgray};
					margin-bottom: 20px;
					padding: 1rem 0 1.5rem;
				}
			`;
		default:
			return;
	}
};

const Wrapper: ComponentType<{position: AdPosition}>  = styled.div`
	background-color: ${props => props.grayBackground ? props.theme.color.whitesmoke : 'inherit'};

	${props => styleBasedOnPosition(props.position)};

	& .ad-container[data-ad-load-state=loaded] div iframe {
		margin: 0 auto;
	}

	& .ad-container[data-ad-load-state=loaded] > div {
		width: 100% !important;
	}
`;

export const MobileHorizontalAdContainer = styled(Wrapper)`
	${media.xlargeUp`
		display: none;
	`}
`;

export const DesktopHorizontalAdContainer = styled(Wrapper)`
	${media.largeDown`
		display: none;
	`}
`;

const AdLabel = styled.p`
	color: ${props => props.theme.color.midgray};
	font-family: ${props => props.theme.typography.primary.fontFamily};
	letter-spacing: 0.1rem;
	margin-bottom: 10px;
	text-align: center;
	text-transform: uppercase;
`;

const HorizontalAdContainer = ({
	desktopAd,
	mobileAd,
	position,
	showLabel,
	grayBackground
}: {
	desktopAd?: React.Node,
	mobileAd?: React.Node,
	position: AdPosition,
	showLabel?: boolean,
	grayBackground?: boolean
}) =>
	<EnsureDefaultTheme>
		<React.Fragment>
			{desktopAd && (
				<DesktopHorizontalAdContainer position={position} grayBackground={grayBackground}>
					{showLabel && <AdLabel><small>Advertisement</small></AdLabel>}
					{desktopAd}
				</DesktopHorizontalAdContainer>
			)}
			{mobileAd && (
				<MobileHorizontalAdContainer position={position} grayBackground={grayBackground}>
					{showLabel && <AdLabel><small>Advertisement</small></AdLabel>}
					{mobileAd}
				</MobileHorizontalAdContainer>
			)}
		</React.Fragment>
	</EnsureDefaultTheme>;

export default HorizontalAdContainer;
