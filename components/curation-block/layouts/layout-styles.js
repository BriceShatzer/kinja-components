// @flow

import styled from 'styled-components';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';

export const SpaceBetweenBlocks = '2rem';

export const VerticalSeparatorElement = styled.div`
	background: ${props => props.theme.color.lightgray};
	width: 1px;
	height: 100%;
	margin: 0;
`;

export const SixThreeThreeGrid = styled.div`
	margin-bottom: ${SpaceBetweenBlocks};

	${media.largeUp`
		display: grid;
		grid-auto-flow: dense;
	`}
	${media.largeOnly`
		/* 0 width colums are for VerticalSeparators */
		grid-template-columns: ${gridValue.large('5c')} 0 ${gridValue.large('3c')};
		grid-column-gap: ${gridValue.large('0.5g')};
	`}
	${media.xlargeOnly`
		grid-template-columns: ${gridValue.xlarge('6c')} 0 ${gridValue.xlarge('3c')} 0 ${gridValue.xlarge('3c')};
		grid-column-gap: ${gridValue.xlarge('0.5g')};
	`}
	${media.xxlargeUp`
		grid-template-columns: ${gridValue.xxlarge('6c')} 0 ${gridValue.xxlarge('3c')} 0 ${gridValue.xxlarge('3c')};
		grid-column-gap: ${gridValue.xxlarge('0.5g')};
	`}
`;

export const OverhangBackground = styled.section``;