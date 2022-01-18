// @flow

import styled from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { gridValue } from '../grid-utils';

const HeaderCustomDescription = styled.div`
	padding-top: 0.5rem;
	font-size: 21px;
	line-height: 24px;
	font-weight: 400;
	color: ${props => props.theme.color.darksmoke};
	text-align: center;
	text-transform: none;
	${media.mediumDown`
		width: 100%;
		font-size: 18px;
	`}
	${media.largeOnly`
		width: ${gridValue.large('6c')};
	`}
	${media.xlargeOnly`
		width: ${gridValue.xlarge('6c')};
	`}
	${media.xxlargeUp`
		width: ${gridValue.xxlarge('6c')};
	`}
`;

export default HeaderCustomDescription;
