// @flow

import * as React from 'react';
import type Post from 'kinja-magma/models/Post';
import styled, { css, ThemeContext } from 'styled-components';
import media from '../../../style-utils/media';
import { gridValue } from '../../grid-utils';
import Card from '../cards/card';
import { TextContainer, BigStoryLabel } from '../cards/static-card';
import CardImage from '../cards/components/image';
import { CardImageWrapper as StaticCardImageWrapper } from '../cards/static-card';
import { CardImageWrapper as EditableCardImageWrapper } from '../cards/editable-card';
import {
	VerticalLayout,
	XlargeFontSize,
	LargeFontSize,
	CenterAlignedText,
	MediumFontSize,
	ExtraBoldHeadline
} from '../cards/card-styles';
import { SpaceBetweenBlocks } from './layout-styles';
import { Container as EmptyCardContainer } from '../cards/empty-card';
import StandardBlockDataContext from '../standard-block-data-context';
import EditorContext from '../editor-context';
import { ImageWrapper } from '../cards/components/image';
import Headline from '../cards/components/headline';
import Excerpt from '../cards/components/excerpt';

type Props = {|
	post: ?Post,
	index: number,
	customStoryLabel?: ?string
|}

const Blur = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 1;
	pointer-events: none;

	@supports ((backdrop-filter: blur(90px)) or (-webkit-backdrop-filter: blur(90px))) {
		backdrop-filter: blur(90px);
	}

	@supports (not ((backdrop-filter: blur(90px)) or (-webkit-backdrop-filter: blur(90px)))) {
		display: none;
	}

	${media.smallOnly`
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 8rem, rgba(0, 0, 0, 0.95) 12rem, rgba(0, 0, 0, 1) 100%);
	`}
	${media.mediumOnly`
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 13rem, rgba(0, 0, 0, 0.95) 20rem, rgba(0, 0, 0, 1) 100%);
	`}
	${media.largeUp`
		mask-image: linear-gradient(${props =>
		props.textOnTheLeft
			? '90deg'
			: '-90deg'}, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.87) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0) 100%);
	`}
`;

const FeaturedCard = styled(Card)`
	position: relative;
	/* overflow: hidden; */
	${ExtraBoldHeadline}
	${VerticalLayout}
	cursor: pointer;

	&:hover,
	&:focus {
		text-decoration: none;
		outline: none;

		${Headline} {
			color: ${props => props.whiteText ? props.theme.color.whitesmoke : props.theme.color.darkgray};
		}

		${Excerpt} {
			color: ${props => props.whiteText ? props.theme.color.whitesmoke : props.theme.color.darkgray};
		}

		${ImageWrapper}::after {
			opacity: 1;
		}
	}

	&:active {
		${Headline} {
			color: ${props => props.whiteText ? props.theme.color.lightgray : props.theme.color.primary};
		}

		${Excerpt} {
			color: ${props => props.whiteText ? props.theme.color.lightgray : props.theme.color.primary};
		}

		${ImageWrapper}::after {
			opacity: 1;
		}
	}

	${StaticCardImageWrapper},
	${EditableCardImageWrapper} {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 0;
		filter: brightness(85%);

		a,
		div {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
		}

		img,
		video {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: ${props => props.textOnTheLeft ? '100% 0' : '0 0'};
		}
	}

	${media.xxlargeUp`
		${XlargeFontSize}
	`}

	${media.xlargeOnly`
		${LargeFontSize}
	`}

	${media.largeDown`
		${MediumFontSize}
	`}

	${media.largeUp`
		${CenterAlignedText}
	`}

	${TextContainer} {
		position: relative;
		z-index: 2;
		pointer-events: ${props => props.editing ? 'auto' : 'none'};

		${media.smallOnly`
			padding-right: ${gridValue.small('1g')};
			padding-left: ${gridValue.small('1g')};
			padding-top: 12rem;
			padding-bottom: 1.5rem;
		`}

		${media.mediumOnly`
			padding-right: ${gridValue.medium('1g')};
			padding-left: ${gridValue.medium('1g')};
			padding-top: 20rem;
			padding-bottom: 1.5rem;
		`}

		${media.largeOnly`
			padding-top: 6rem;
			padding-right: ${props => props.textOnTheLeft ? gridValue.large('4c1g') : gridValue.large('1g')};
			padding-bottom: 6rem;
			padding-left: ${props => props.textOnTheLeft ? gridValue.large('1g') : gridValue.large('4c1g')};
		`}

		${media.xlargeOnly`
			padding-top: 8rem;
			padding-right: ${props => props.textOnTheLeft ? gridValue.xlarge('6c1g') : gridValue.xlarge('1c1g')};
			padding-bottom: 8rem;
			padding-left: ${props => props.textOnTheLeft ? gridValue.xlarge('1c1g') : gridValue.xlarge('6c1g')};
		`}

		${media.xxlargeUp`
			padding-top: 10rem;
			padding-right: ${props => props.textOnTheLeft ? gridValue.xxlarge('6c1g') : gridValue.xxlarge('1c1g')};
			padding-bottom: 10rem;
			padding-left: ${props => props.textOnTheLeft ? gridValue.xxlarge('1c1g') : gridValue.xxlarge('6c1g')};
		`}
	}

	${props => props.floatingLabel && css`
		${BigStoryLabel} {
			${media.xlargeUp`
				position: absolute;
				transform-origin: center center;
			`}

			${media.xlargeOnly`
				transform: rotate(-20deg) scale(1.2);
				top: 0;
				left: -0.5rem;
			`}

			${media.xxlargeUp`
				transform: rotate(-20deg) scale(1.5);
				top: 0.5rem;
				left: 0.5rem;
			`}
		}
	`}
`;

const Wrapper = styled.div`
	position: relative;
	margin-bottom: ${SpaceBetweenBlocks};

	${EmptyCardContainer} + ${Blur} {
		display: none;
	}
`;

// Duplicate and blur image to work around backdrop-filter support.
// Remove once backdrop-filter is supported in all browsers.
const BlurredCardImage = styled(CardImage)`
	@supports ((backdrop-filter: blur(90px)) or (-webkit-backdrop-filter: blur(90px))) {
		display: none;
	}

	@supports (not ((backdrop-filter: blur(90px)) or (-webkit-backdrop-filter: blur(90px)))) {
		position: absolute;
		z-index: 1;
		width: 100%;
		height: 100%;
		pointer-events: none;

		${media.mediumDown`
			filter: blur(20px) brightness(85%);
		`}
		${media.largeUp`
			filter: blur(50px) brightness(85%);
		`}

		a,
		div {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
		}

		img,
		video {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: ${props => props.textOnTheLeft ? '100% 0' : '0 0'};
		}

		${media.smallOnly`
			mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 8rem, rgba(0, 0, 0, 0.95) 12rem, rgba(0, 0, 0, 1) 100%);
			`}
		${media.mediumOnly`
			mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.05) 13rem, rgba(0, 0, 0, 0.95) 20rem, rgba(0, 0, 0, 1) 100%);
		`}
		${media.largeUp`
			mask-image: linear-gradient(${props =>
		props.textOnTheLeft
			? '90deg'
			: '-90deg'}, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.87) 50%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0) 100%);
		`}
	}
`;

export default function FeaturedStory(props: Props) {
	const { post, index, customStoryLabel } = props;
	const { block } = React.useContext(StandardBlockDataContext);
	const { cards } = block;
	const themeContext = React.useContext(ThemeContext);
	const { editMode } = React.useContext(EditorContext);
	const textOnTheLeft = themeContext.blog === 'deadspin';
	const floatingLabel = themeContext.blog === 'deadspin';
	return (
		<Wrapper>
			{post && cards[0] &&
				<BlurredCardImage
					post={post}
					aboveHeadline
					sizes={'100vw'}
					customImage={cards[0].customThumbnail}
					noLazy
					textOnTheLeft={textOnTheLeft}
				/>
			}
			<FeaturedCard
				post={post}
				blockIndex={index}
				index={0}
				showExcerpt
				whiteText
				imageSizes={'100vw'}
				bigStory
				textOnTheLeft={textOnTheLeft}
				floatingLabel={floatingLabel}
				editing={editMode}
				customStoryLabel={customStoryLabel}
			/>
			<Blur textOnTheLeft={textOnTheLeft}/>
		</Wrapper>
	);
}
