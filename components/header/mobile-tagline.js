// @flow

import styled, { css } from 'styled-components';

import media from '../../style-utils/media';

/**
 * A tagline to show on mobile only in the header
 */
const MobileTagline = styled.div`
	display: none;
	line-height: 19px;
	color: ${props => props.theme.color.darkgray};
	padding-left: 18px;
	padding-bottom: 16px;
	font-family: ${props => props.theme.typography.headline.fontFamily};
	${props => props.theme.blog === 'theonion' && css`
		font-style: italic;
	`}

	${media.largeUp`
		display: none;
	`}
`;

export default MobileTagline;
