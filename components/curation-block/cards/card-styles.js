// @flow

import { css } from 'styled-components';
import { TextContainer, BlockLink, MultipleAuthorsContainer } from './static-card';
import { ImageWrapper } from './components/image';
import Headline from './components/headline';
import Excerpt from './components/excerpt';
import { Label } from  '../../story-type-label/story-type-label';
import { Wrapper as VideoThumbnail } from 'kinja-components/components/video-thumbnail/video-thumbnail';
import { KinjaVideoContainer } from 'kinja-components/components/postbody/kinja-video/kinja-video';

export const VerticalLayout = css`
	${ImageWrapper},
	${VideoThumbnail},
	${KinjaVideoContainer} {
		margin-bottom: var(--ImageMarginBottom);
	}
`;

export const HorizontalLayout = css`
	display: flex;
	flex-wrap: wrap;

	${ImageWrapper},
	${VideoThumbnail},
	${KinjaVideoContainer} {
		margin-bottom: 0;
	}

	${TextContainer} {
		flex: 1;
	}
`;

export const ImageOnTheRight = css`
	${TextContainer} {
		order: -1;
	}
`;

export const CenterAlignedText = css`
	${TextContainer} {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	${Headline},
	${Label},
	${Excerpt},
	${MultipleAuthorsContainer} {
		text-align: center;
	}
`;

export const ExtraBoldHeadline = css`
	${Headline} {
		font-weight: 800;
	}
`;

export const XlargeFontSize = css`
	--ImageMarginBottom: 1.25rem;

	${Label} {
		margin-bottom: 1rem;
	}

	${Headline} {
		/* Change to headline font once onion frontpage is released */
		font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.xlarge :
		props.theme.typography.headline.fontSizes.xlarge};
		line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.xlarge :
		props.theme.typography.headline.lineHeights.xlarge};
	}

	${Excerpt} {
		font-size: ${props => props.theme.typography.body.fontSizes.small};
		line-height: ${props => props.theme.typography.body.lineHeights.small};
	}

	${BlockLink}:not(:last-child) ${Headline}:not(:empty),
	${Headline}:not(:last-child):not(:empty) {
		margin-bottom: 0.75rem;
	}

	${BlockLink}:not(:last-child) ${Excerpt}:not(:empty),
	${Excerpt}:not(:last-child):not(:empty) {
		margin-bottom: 1rem;
	}
`;

export const LargeFontSize = css`
	--ImageMarginBottom: 1rem;

	${Label} {
		margin-bottom: 0.5rem;
	}

	${Headline} {
		/* Change to headline font once onion frontpage is released */
		font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.large :
		props.theme.typography.headline.fontSizes.large};
		line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.large :
		props.theme.typography.headline.lineHeights.large};
	}

	${Excerpt} {
		font-size: ${props => props.theme.typography.body.fontSizes.small};
		line-height: ${props => props.theme.typography.body.lineHeights.small};
	}

	${BlockLink}:not(:last-child) ${Headline}:not(:empty),
	${BlockLink}:not(:last-child) ${Excerpt}:not(:empty),
	${Headline}:not(:last-child):not(:empty),
	${Excerpt}:not(:last-child):not(:empty) {
		margin-bottom: 0.5rem;
	}
`;

export const MediumFontSize = css`
	--ImageMarginBottom: 0.75rem;

	${Label} {
		margin-bottom: 0.25rem;
	}

	${Headline} {
		/* Change to headline font once onion frontpage is released */
		font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.medium :
		props.theme.typography.headline.fontSizes.medium};
		line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.medium :
		props.theme.typography.headline.lineHeights.medium};
	}

	${Excerpt} {
		font-size: ${props => props.theme.typography.body.fontSizes.xsmall};
		line-height: ${props => props.theme.typography.body.lineHeights.xsmall};
	}

	${BlockLink}:not(:last-child) ${Headline}:not(:empty),
	${BlockLink}:not(:last-child) ${Excerpt}:not(:empty),
	${Headline}:not(:last-child):not(:empty),
	${Excerpt}:not(:last-child):not(:empty) {
		margin-bottom: 0.25rem;
	}
`;

export const SmallFontSize = css`
	--ImageMarginBottom: 0.75rem;

	${Label} {
		margin-bottom: 0.25rem;
	}

	${Headline} {
		/* Change to headline font once onion frontpage is released */
		font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.small :
		props.theme.typography.headline.fontSizes.small};
		line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.small :
		props.theme.typography.headline.lineHeights.small};
	}

	${Excerpt} {
		font-size: ${props => props.theme.typography.body.fontSizes.xsmall};
		line-height: ${props => props.theme.typography.body.lineHeights.xsmall};
	}

	${BlockLink}:not(:last-child) ${Headline}:not(:empty),
	${BlockLink}:not(:last-child) ${Excerpt}:not(:empty),
	${Headline}:not(:last-child):not(:empty),
	${Excerpt}:not(:last-child):not(:empty) {
		margin-bottom: 0.25rem;
	}
`;

export const XSmallFontSize = css`
	--ImageMarginBottom: 0.75rem;

	${Label} {
		margin-bottom: 0.25rem;
	}

	${Headline} {
		/* Change to headline font once onion frontpage is released */
		font-size: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.fontSizes.xsmall :
		props.theme.typography.headline.fontSizes.xsmall};
		line-height: ${props => props.theme.typography.curatedHomepage ?
		props.theme.typography.curatedHomepage.lineHeights.xsmall :
		props.theme.typography.headline.lineHeights.xsmall};
	}

	${Excerpt} {
		font-size: ${props => props.theme.typography.body.fontSizes.xsmall};
		line-height: ${props => props.theme.typography.body.lineHeights.xsmall};
	}

	${BlockLink}:not(:last-child) ${Headline}:not(:empty),
	${BlockLink}:not(:last-child) ${Excerpt}:not(:empty),
	${Headline}:not(:last-child):not(:empty),
	${Excerpt}:not(:last-child):not(:empty) {
		margin-bottom: 0.25rem;
	}
`;

export function Separator(side: string, size: string) {
	switch (side) {
		case 'top':
			return css`
				padding-top: ${size};
				border-top: 1px solid ${props => props.theme.color.lightgray};
				margin-top: ${size};
			`;
		case 'right':
			return css`
				padding-right: ${size};
				border-right: 1px solid ${props => props.theme.color.lightgray};
				margin-right: calc(${size} - 1px); /* Subtract border width for gridValue support */
			`;
		case 'bottom':
			return css`
				padding-bottom: ${size};
				border-bottom: 1px solid ${props => props.theme.color.lightgray};
				margin-bottom: ${size};
			`;
		case 'left':
			return css`
				padding-left: ${size};
				border-left: 1px solid ${props => props.theme.color.lightgray};
				margin-left: calc(${size} - 1px); /* Subtract border width for gridValue support */
			`;
	}
}