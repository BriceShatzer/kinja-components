// @flow

import { css } from 'styled-components';
import media from 'kinja-components/style-utils/media';

export const mainVideoRatioOnDesktop = 3 / 4;
export const mainVideoRatioOnHugeDesktop = 4 / 5;
export const playerRatio = 9 / 16;

export default css`
	height: calc(100vw * ${playerRatio} * ${mainVideoRatioOnDesktop});

	${media.largeDown`
		height: calc(100vw * ${playerRatio});
	`}

	@media screen and (min-width: 2200px) {
		height: calc(100vw * ${playerRatio} * ${mainVideoRatioOnHugeDesktop});
	}
`;
