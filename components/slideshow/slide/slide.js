/* @flow */

import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { isArray } from 'lodash';
import styled, { css } from 'styled-components';
import renderPlainText from 'postbody/utils/renderPlainText';
import createTranslate from '../../translator';
import translations from '../translations';
import imageUrl from 'kinja-images/imageUrl';
import getTransforms from 'kinja-images/transforms/permalink';
import { EnsureDefaultTheme } from '../../theme';
import media from '../../../style-utils/media';
import { type SlideshowAspectRatio } from 'postbody/blockNodes/Slideshow';
import { Loading } from '../../elements/loader';
import FullscreenIcon from '../../icon19/Fullscreen';
import ImageAttribution from '../../image-attribution';
import InlineNodes from '../../postbody/inline-node';
import type ImageNode from 'postbody/blockNodes/ImageNode';
import { stripHTMLWithRegex } from '../../../utils/string';

type Props = {
	index: number,
	image: ImageNode,
	aspectRatio: SlideshowAspectRatio,
	load?: boolean,
	onLoad?: number => void,
	onImageClick?: () => void,
	hideAttribution?: boolean,
	preLoad?: boolean,
	fullscreenEnabled?: boolean,
	// Alt text is backfilled with the post headline if caption and alt texts are unavailable
	postHeadline?: string,
	// Localization language
	language?: string
};

type State = {
	isLoading: boolean
};

export const CaptionItem = styled.figcaption`
	color: ${props => props.theme.color.darksmoke};
	font-size: 16px;
	line-height: 21px;
	margin: 0 auto;
	padding: 0 ${props => props.theme.columnPadding} ${props => props.theme.columnPadding};
	max-width: ${props => props.theme.postContentMaxWidth};

	${media.largeUp`
		padding: 0 0 15px;
		margin: 0 82px;
	`}
`;

export const SlideCaption = styled.div`
	padding-top: ${props => props.theme.columnPadding};
	min-height: 57px;
`;

export const SlideFullscreenIndicator = styled.div`
	position: absolute;
	top: 16px;
	left: 16px;
	opacity: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	padding: 13px;
	background: ${props => props.theme.color.darksmoke};
	transition: opacity ${props => props.slideshowTransitionDuration} ease-out;

	svg {
		color: ${props => props.theme.color.white};
	}
`;

export const SlideImageContainer = styled.div`
	align-items: center;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	overflow: hidden;
	background: ${props => props.theme.color.black};
	user-select: none;
	${media.mediumDown`
		background: ${props => props.theme.color.darksmoke};
		pointer-events: none;
	`}
	${media.largeUp`
		cursor: pointer;
		&:hover ${SlideFullscreenIndicator} {
			opacity: 1;
		}
	`}
`;

export const SlideImage = styled.picture`
	align-items: center;
	box-sizing: border-box;
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	overflow: hidden;
	user-select: none;
	width: 100%;

	img {
		max-width: 100%;
		max-height: 100%;
		align-self: center;
		position: relative;
		user-select: none;
		object-fit: contain;
	}

	${props => props.hidden && `
		display: none;
	`}
`;

export const SlideContainer = styled.div`
	width: 100%;
	padding-bottom: 66.6666%;
	position: relative;
	${props => props.wide && `
		padding-bottom: 56.25%;
	`}
`;

export const SlideInner = styled.div`
	@media only screen and (orientation: landscape) {
		margin: inherit;
	}
`;
export const KinjaSlide = styled.div`
	transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
	width: 100%;
	position: relative;
	flex: 0 0 100%;

	@media only screen and (orientation: landscape) {
		justify-content: flex-start;
	}
`;

export const SlideBlurBackground = styled.div`
	background-size: cover;
	background-position: center center;
	filter: blur(30px);
	position: absolute;
	width: 120%;
	height: 120%;
	opacity: 0.6;

	${props => props.loaded && css`
		background-image: url(${props.url});
	`}

	${props => props.hidden && `
		display: none;
	`}

	${media.mediumDown`
		display: none;
	`}
`;

class Slide extends Component<Props, State> {
	static defaultProps = {
		fullscreenEnabled: true
	};

	constructor(props: Props) {
		super(props);

		this.state = {
			isLoading: !props.preLoad
		};
	}

	@autobind
	onImageLoad() {
		this.setState(
			{
				isLoading: false
			},
			() => {
				const { onLoad, index } = this.props;
				if (onLoad) {
					onLoad(index);
				}
			}
		);
	}

	render() {
		const {
			image: { id, width, format, alignment, caption, attribution, altText },
			aspectRatio,
			load,
			onImageClick,
			hideAttribution,
			fullscreenEnabled,
			language,
			postHeadline
		} = this.props;
		const showAttribution = !hideAttribution && isArray(attribution) && Boolean(attribution.length);
		const MaybeAttribution = () =>
			showAttribution && (
				<CaptionItem>
					<ImageAttribution attributions={attribution} />
				</CaptionItem>
			);
		const MaybeCaption = () => {
			if (caption && caption.length) {
				return (
					<CaptionItem>
						<InlineNodes nodes={caption} />
					</CaptionItem>
				);
			}
			return null;
		};

		const imageTransform = getTransforms(width, format, alignment);
		// Super wide image transform is supported here, but not for all images.
		const defaultSize = imageTransform.superLarge || imageTransform.default;
		const url = imageUrl(id, defaultSize, format);
		const smallUrl = imageUrl(id, imageTransform.small, format);
		const dataAttributes = {
			'data-chomp-id': id,
			'data-format': format
		};

		const { isLoading } = this.state;
		// renderPlainText expects InlineNodeJSON but we supposedly have InlineNodes here, and they are not interchangable, though they should be
		const alt = altText || (caption && caption.length && renderPlainText((caption: any))) || (() => {
			const translate = createTranslate(translations, language);
			if (postHeadline) {
				return translate('Illustration for article titled {postHeadline}', { postHeadline: stripHTMLWithRegex(postHeadline) });
			}
		})();
		return (
			<EnsureDefaultTheme>
				<KinjaSlide>
					<SlideInner>
						<SlideContainer wide={aspectRatio === 'Wide'}>
							<SlideImageContainer onClick={onImageClick}>

								<SlideBlurBackground
									loaded={load}
									url={url}
									hidden={isLoading}
								/>

								{fullscreenEnabled && <SlideFullscreenIndicator>
									<FullscreenIcon />
								</SlideFullscreenIndicator>}

								{load && (
									<SlideImage hidden={isLoading}>
										<source srcSet={smallUrl} media="(max-width: 599px)" />
										<img src={url} alt={alt}
											onLoad={this.onImageLoad}
											draggable={false}
											{...dataAttributes}
										/>
									</SlideImage>
								)}

								{isLoading && <Loading />}

							</SlideImageContainer>
						</SlideContainer>

						<SlideCaption>
							<MaybeCaption />
							<MaybeAttribution />
						</SlideCaption>

					</SlideInner>
				</KinjaSlide>
			</EnsureDefaultTheme>
		);
	}
}

export default Slide;
