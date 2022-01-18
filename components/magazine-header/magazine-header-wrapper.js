// @flow

import styled from 'styled-components';
import media from 'kinja-components/style-utils/media';

export const MagazineHeaderWrapper = styled.header`
	background: ${props => props.theme.color.black};
	display: flex;
	height: auto;
	flex-direction: column;
	position: relative;
	width: 100%;

	${media.xlargeUp`
		flex-direction: row;
	`}
`;