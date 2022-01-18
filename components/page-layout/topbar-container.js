// @flow

import styled from 'styled-components';
import media from 'kinja-components/style-utils/media';

const TopBarContainer = styled.div`
	display: none;
	${media.largeUp`
		display: block;
		width: 100%;
	`}
`;

export default TopBarContainer;
