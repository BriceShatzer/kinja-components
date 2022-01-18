// @flow

import styled from 'styled-components';

import media from '../../style-utils/media';


export const StreamToolContainer = styled.div`
	display: flex;
	width: 100%;
`;

export const StreamUserTools = styled.div`
	display: flex;
	position: relative;

	/* horizontal toolbar */
	${media.smallOnly`
		flex-direction: row;
		justify-content: flex-end;
	`}

	/* vertical toolbar */
	${media.mediumUp`
		flex-direction: column;
		justify-content: center;
	`}
`;
