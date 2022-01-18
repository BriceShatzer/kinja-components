// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import media from '../../style-utils/media';
import { darken } from 'polished';
import Theme from '../theme/theme';
import { BackButton, CenteredButton, CloseButton} from './common';

import type Blog from 'kinja-magma/models/Blog';

const Side = styled.section`
	position: relative;
	padding: var(--padding);
	background-color: ${({ theme }) => theme.color.white};
	
	${media.mediumOnly`
		@media (orientation: portrait) {
			padding: calc(var(--padding) * 1.5) ${({ theme }) => theme.columnPadding};
		}
	`}
	${media.smallOnly`
	 	padding: calc(var(--padding) * 1.5) ${({ theme }) => theme.columnPadding};
	`}

	${CloseButton} {
		z-index: 5;
	}
`;

const RightSide = styled(Side)`
	${media.largeUp`
		${BackButton} {
			display: none;
		}
	`}

	ul {
		font-size: 16px;
		line-height: 21px;
	}
`;

const LeftSide = styled(Side)`
	background-color: ${({ theme }) => theme.color.backgroundLight};
	border-radius: 3px 0 0 3px;

	${media.mediumDown`		
		${BackButton} {
			display: none;
		}
	`}

	ul {
		font-family: ${({ theme }) => theme.typography.headline.fontFamily};
		font-size: 18px;
		line-height: 24px;

		${({ theme }) => theme.typography.headline.fontFamily === 'ElizabethSerif, Georgia, serif' && css`
			font-size: 15px;
		`}
	}
`;

const Container = styled.main`
	--padding: 60px;
	display: flex;

	${props => props.columnLayout && css`
		flex-direction: column;
		font-size: 18px;
		line-height: 24px;

		${media.mediumUp`
			width: 640px;
		`}
	`}

	${props => !props.columnLayout && css`
		${media.largeUp`
			width: 720px;
			height: 530px;
			${LeftSide},
			${RightSide} {
				flex-basis: 50%;
				flex-grow: 0;
				flex-shrink: 0;
			}			
		`}

		${media.mediumDown`			
			@media (orientation: landscape) {
				min-width: 100vw;
				align-items: stretch;
				flex-direction: row;
			}
			@media (orientation: portrait ) {				
				flex-direction: column-reverse;
				${RightSide} {
					padding-top: var(--padding);
				}				
			}				
		`}
		
		${media.smallOnly`
			flex-direction: column-reverse;
			${RightSide} {
				padding-top: var(--padding);
			}
		`}
	`}

	button {
		font-size: 18px;

		&:not(${CenteredButton}) {
			width: 100%;
			padding: 0;
			margin-left: 0 !important;
			margin-right: 0 !important;
		}
	}

	a {
		color: ${({ theme }) => theme.color.primary};

		&:hover,
		&:focus {
			color: ${({ theme }) => darken(0.2, theme.color.primary)};

			svg:not([name=copy]) {
				color: ${({ theme }) => darken(0.2, theme.color.primary)};
			}
		}

		&:active {
			outline: none;
		}
	}

	ul {
		margin: 0;
	}

	li {
		display: flex;
	}

	strong {
		font-weight: 800;
	}

	li:not(:last-child),
	button:not(:last-child) {
		margin-bottom: calc(var(--padding) / 4);

		${media.mediumDown`
			margin-bottom: calc(var(--padding) / 2);
		`}
	}

	${media.mediumOnly`
		--padding: 40px;
		@media (orientation: portrait ) {
			--padding: 30px;
			max-width: 425px;
		}
	`}

	${media.smallOnly`
		--padding: 30px;
	`}
`;

type Props = {
	blog?: Blog,
	infoComponent: React.Node,
	formComponent: React.Node,
	columnLayout: boolean
}

export default function LoginLayout(props: Props) {
	return (
		<Theme blog={props.blog && props.blog.blogTheme}>
			<Container columnLayout={props.columnLayout}>
				<LeftSide>
					{props.infoComponent}
				</LeftSide>
				<RightSide>
					{props.formComponent}
				</RightSide>
			</Container>
		</Theme>
	);
}
