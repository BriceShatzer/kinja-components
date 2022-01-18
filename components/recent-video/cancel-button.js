/* @flow */

import styled, { css } from 'styled-components';
import media from '../../style-utils/media';

// TODO switch this out with a regular `<Button secondary variant="inverse">` component once that's cleaned up
const CancelButton = styled.div`
	border: 1px solid white;
	color: white;
	height: 41px;
	line-height: 41px;
	border-radius: 21px;
	font-size: 18px;
	padding: 0 2rem;
	letter-spacing: 0.5px;
	cursor: pointer;
	display: inline-block;
	margin-top: 34px;

	${media.smallOnly`
		height: 32px;
		line-height: 32px;
		font-size: 14px;
		margin: 0 5px;
	`}

	${props => props.inSidebar && css`
		height: 32px;
		line-height: 32px;
		font-size: 14px;
		margin: 0 5px;
	`}
`;
CancelButton.displayName = 'CancelButton';

export default CancelButton;