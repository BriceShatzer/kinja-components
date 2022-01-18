import styled, { css } from 'styled-components';
import media from '../../style-utils/media';
import { ButtonWrapper } from '../button19/button19';
import { gridValue } from '../grid-utils';

export const AuthorBioWrapper = styled.div`
	max-width: ${props => props.withStandardGrid ? '100%' : props.theme.postContentMaxWidth};
	margin: 40px auto 0;

	${media.largeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.large('6c') : props.theme.postContentMaxWidth};
	`}

	${media.xlargeOnly`
		max-width: ${props => props.withStandardGrid ? gridValue.xlarge('6c') : props.theme.postContentMaxWidth};
	`}

	${props => props.wideRail ? css`
		${media.xxlargeOnly`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
		`}
		${media.xxxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxxlarge('6c') : props.theme.postContentMaxWidth};
		`}
	` : css`
		${media.xxlargeUp`
			max-width: ${props => props.withStandardGrid ? gridValue.xxlarge('6c') : props.theme.postContentMaxWidth};
		`}
	`}
`;

export const MainWrapper = styled.div``;

export const AuthorWrapper = styled.div`
	display: flex;
	flex-direction: column;

	${MainWrapper}:not(:first-child) {
		margin-top: 1rem;
	}
`;


export const AuthorInfo = styled.div`
	font-family: ${({ theme }) => theme.typography.utility.fontFamily};
	display: flex;
	flex-direction: row;

	a {
		color: ${({ theme }) => theme.color.darksmoke};
	}

	${media.smallOnly`
		flex-direction: column;
	`}
`;

export const AuthorName = styled.a`
	font-size: 21px;
	line-height: 32px;
	font-weight: bold;
	margin-right: 1rem;

	${media.smallOnly`
		margin-bottom: 0.25rem;
	`}
`;

export const AuthorLinksWrapper = styled.div`
	display: flex;
	flex-direction: row;

	${ButtonWrapper} {
		margin-right: 0.5rem;
	}
`;

export const Bio = styled.p`
	font-size: 1rem;
	line-height: 29px;
	margin-bottom: 0;
	font-family: ${({ theme }) => theme.typography.body.fontFamily};
	color: ${({ theme }) => theme.color.darksmoke};

	a {
		color: ${({ theme }) => theme.color.primary};
	}

	${media.smallOnly`
		margin-top: 0.25rem;
	`}
`;
