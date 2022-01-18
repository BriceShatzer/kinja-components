// @flow
import styled from 'styled-components';
import media from '../../style-utils/media';

export const PostToolsContainerDesktop = styled.div`
	position: absolute;
	width: 82px;
	right: -82px;
	display: flex;
	justify-content: center;
	${media.smallOnly`
		display: none;
	`}
`;

export const PostToolsContainerMobile = styled.div`
	align-self: flex-end;
	${media.mediumUp`
		display: none;
	`}
`;
