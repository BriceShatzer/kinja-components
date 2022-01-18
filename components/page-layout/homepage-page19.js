// @flow

// A container for a list of elements below each other, without a sidebar

import styled from 'styled-components';

import media from '../../style-utils/media';
import { gridValue } from '../grid-utils';
import { MainContent, MainWrapper } from './main';

const HomepagePage = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	flex-wrap: wrap;

	${MainContent} {
		max-width: none;
		padding-top: 16px;
	}

	${MainWrapper} {
		padding: 0;

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

		${media.xxlargeOnly`
			width: ${gridValue.xxlarge('12c')};
		`}

		${media.xxxlargeUp`
			width: ${gridValue.xxlarge('12c')};
		`}
	}
`;

export default HomepagePage;
