// @flow
import styled from 'styled-components';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import { Wrapper as RadioWrapper } from '../../form/radio';

export const SectionHeader = styled.h4`
	color: ${props => props.theme.color.darkgray};
	font-size: ${props => props.theme.typography.primary.fontSizes.small};
	line-height: ${props => props.theme.typography.primary.lineHeights.small};
	margin-bottom: 1.5rem;
`;

export const FieldHeaderLabel = styled.label`
	color: ${props => props.theme.color.gray};
	font-size: ${props => props.theme.typography.primary.fontSizes.xsmall};
	line-height: ${props => props.theme.typography.primary.lineHeights.xsmall};
	margin-bottom: 1.5rem;
`;

export const Container = styled.div`
	margin-bottom: 2rem;
`;

export const ColumnWrapper = styled.div`
	${media.xlargeUp`
		display: flex;
	`}
`;

export const Column = styled.div`
	width: ${gridValue.small('6c')};
	margin-bottom: 1rem;
	${media.xlargeUp`
		margin-bottom: 0;
	`}

	${media.xlargeOnly`
		width: ${gridValue.xlarge('3c')};
		&:not(:last-child) {
			margin-right: ${gridValue.xlarge('1g')};
		}
	`}

	${media.xxlargeOnly`
		width: ${gridValue.xxlarge('3c')};
		&:not(:last-child) {
			margin-right: ${gridValue.xxlarge('1g')};
		}
	`}

	${media.xxxlargeUp`
		width: ${gridValue.xxxlarge('3c')};
		&:not(:last-child) {
			margin-right: ${gridValue.xxxlarge('1g')};
		}
	`}

	${RadioWrapper} {
		height: auto;
	}
`;