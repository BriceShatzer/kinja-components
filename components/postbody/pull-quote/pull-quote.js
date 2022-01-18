// @flow

import * as React from 'react';
import styled, { css } from 'styled-components';
import type { PullQuoteProps } from 'postbody/blockNodes/PullQuote';
import InlineNodes from '../inline-node';

import { EnsureDefaultTheme } from '../../theme';
import blogTheme from './blogTheme';
import PullQuoteContent from './pull-quote-content';
import PullQuoteHelper from './pull-quote-helper';
import media from '../../../style-utils/media';

const PullQuoteWrapper = styled.aside`
	max-width: ${props => props.theme.postContentMaxWidth};
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 2rem;
	margin-top: 2rem;
	text-align: center;
	padding: 10px 0;
	font-family: ${props => props.theme.typography.primary.fontFamily};
	font-weight: lighter;
	font-style: italic;
	font-size: 25px;
	line-height: 37px;
	clear: left;

	&::before,
	&::after {
		content: '';
		display: block;
		width: 45px;
		height: 0;
		margin: 0 auto;
		position: relative;
		border-top-width: 1px;
		border-top-style: solid;
		border-color: ${props => props.theme.color.primary};
	}

	&::before {
		margin-bottom: 20px;
	}

	&::after {
		margin-top: 20px;
	}

	${props => props.alignment === 'Center' && css`
		margin-top: 2.5rem;
		margin-bottom: 2.5rem;

		${media.mediumUp`
			max-width: 66%;
		`}
	`}

	${props => props.alignment === 'Left' && css`
		${media.mediumUp`
			width: 40%;
			max-width: 320px;
			float: left;
			margin-right: ${props => props.theme.columnGutter};
			text-align: left;
			margin-bottom: 0.5em;
			margin-top: 0;

			&::before,
			&::after {
				margin-left: 0;
				margin-right: 0;
			}
		`}
	`}

	/* helper spans for branding designs */
	${PullQuoteHelper} {
		display: none;
	}

	${PullQuoteContent} {
		display: block;
		padding-left: ${props => props.alignment === 'Left' ? 0 : props.theme.columnPadding};
		padding-right: ${props => props.alignment === 'Left' ? 0 : props.theme.columnPadding};
	}

	${props => props.disableBranding ? blogTheme('default') : blogTheme(props.theme.blog)};
`;
// TODO: handle review and comments styling somehow

export function PullQuote(props: PullQuoteProps & { editable?: boolean, disableBranding?: boolean, isAmp?: boolean }) {
	const { alignment, value, editable, disableBranding, isAmp } = props;
	const contentEditable = isAmp ? {} : { contentEditable: false};
	return (
		<EnsureDefaultTheme>
			<PullQuoteWrapper alignment={alignment} className={editable && `pullquote align--${alignment.toLowerCase()}`} disableBranding={disableBranding}>
				<PullQuoteHelper className={editable && 'pullquote__helper'} {...contentEditable} />
				<PullQuoteContent className={editable && 'pullquote__content'}>
					<InlineNodes nodes={value}/>
				</PullQuoteContent>
				<PullQuoteHelper className={editable && 'pullquote__helper'} {...contentEditable} />
			</PullQuoteWrapper>
		</EnsureDefaultTheme>
	);
}

export default PullQuote;
