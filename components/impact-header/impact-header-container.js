// @flow

import styled from 'styled-components';

import {
	ImageNodeWrapper
} from 'kinja-components/components/postbody/image-node/image-node';

export const ImpactHeaderContainer = styled.header`
	background: ${({ theme }) => theme.color.white};
	overflow: hidden;
	width: 100%;
	height: calc(100vh - 83px);
	position: relative;

	${ImageNodeWrapper} {
		margin: 0;
		height: 100%;
	}
`;
