// @flow

import * as React from 'react';
import styled from 'styled-components';

import { EnsureDefaultTheme } from '../../theme';
import type { SlideshowAspectRatio } from 'postbody/blockNodes/Slideshow';
import type ImageNode from 'postbody/blockNodes/ImageNode';
import imageUrl from 'kinja-images/imageUrl';
import SimpleImage from 'kinja-magma/models/SimpleImage';

// ICONS
import CropIcon from '../../icon19/Crop';
import TrashcanIcon from '../../icon19/Trashcan';
import ArrowLeftIcon from '../../icon19/ArrowLeft';
import ArrowRightIcon from '../../icon19/ArrowRight';
import SlideshowIcon from '../../icon19/Slideshow';


import InlineNodes from '../../postbody/inline-node';
import ImageAttribution from '../../image-attribution';
import {
	SlideContainer,
	KinjaSlide,
	SlideBlurBackground,
	SlideImageContainer,
	SlideImage,
	SlideCaption
} from '../slide';
import {
	SlideshowNavigateLeft,
	SlideshowNavigateRight,
	SlideshowIndex,
	SlideshowIndexPaging,
	SlideShowContainer
} from '../slideshow';

const SlideshowInset = styled.aside`
	${SlideShowContainer} {
		${KinjaSlide} {
			${SlideCaption} {
				min-height: 56px;
				outline: none;
				margin: 0 82px;
				padding: 18px 0;

				&:focus {
					outline: none;
				}
			}
			.popup-attribution {
				color: ${props => props.theme.color.darkgray};
				margin: 0 82px 8px;
				span {
					color: ${props => props.theme.color.darksmoke};
				}
			}
		}

		.inline-toolbar {
			position: absolute;
			top: 10px;
			left: 10px;
			display: none;

			li {
				list-style-type: none;
				line-height: 24px;
				padding: 0;
				margin: 0;

				a {
					box-shadow: none;
				}

				&::before {
					display: none;
				}
			}
		}

		&:hover {
			.inline-toolbar {
				display: block;
			}
		}
	}
`;

const SlideshowCallToAction = styled.div`
	border: 1px dashed ${props => props.theme.color.midgray};
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: ${props => props.theme.color.whitesmoke};

	h1 {
		color: ${props => props.theme.color.gray};
		font-size: 16px;
		font-weight: normal;
		margin-bottom: 10px;
	}
`;

const ListElement = styled.ul`
	svg {
		color: ${props => props.theme.color.black};
	}
`;

/**
 * This component is how a slideshow appears in the scribe editor
 * It is NOT the ui responsible for editing a slideshow
 */
const SlideshowInEditor = (props: {
	slides: Array<ImageNode>,
	aspectRatio: SlideshowAspectRatio,
	thumbnail?: ?SimpleImage,
	currentSlideIndex?: number
}) => {
	const { thumbnail, aspectRatio, slides = [], currentSlideIndex } = props;
	const thumbnailProps = thumbnail ? {
		'data-thumb-id': thumbnail.id,
		'data-thumb-format': thumbnail.format
	} : {};
	const firstSlide: ImageNode = slides[currentSlideIndex || 0];
	const url = firstSlide && imageUrl(firstSlide.id, 'original', firstSlide.format);

	/**
	 * This toolbar appears on the slide inside the slideshow in the editor
	 */

	const toolbar = (
		<ListElement className="editor-inline-toolbar inline-toolbar active">
			<li>
				<a href="javascript:;" className="js_crop" role="button" title="Crop image"><CropIcon /></a>
			</li>
			<li>
				<a href="javascript:;" className="js_remove-image" role="button" title="Delete image"><TrashcanIcon /></a>
			</li>
		</ListElement>
	);
	const hasCaption = firstSlide && firstSlide.caption && firstSlide.caption.length > 0;
	const attribution = firstSlide && firstSlide.attribution;
	const hasAttribution = attribution && attribution.length > 0;
	const captionAndAttribution = firstSlide ? (
		<React.Fragment>
			<SlideCaption
				contentEditable
				suppressContentEditableWarning
				className="js_caption"
			>
				{hasCaption && <InlineNodes nodes={firstSlide.caption} />}
			</SlideCaption>
			{attribution && hasAttribution && (
				<div className="popup-attribution updated">
					<ImageAttribution attributions={attribution} tokenize />
				</div>
			)}
			{!hasAttribution && !hasCaption && (
				<div className="popup-attribution placeholder" data-placeholder="Add image credit, source, and caption" >
					Add image credit, source, and caption
				</div>
			)}
		</React.Fragment>
	) : <SlideCaption className="js_caption"/>;

	// used for attribution modal
	const slideDataAttributes = firstSlide ? {
		'data-chomp-id': firstSlide.id,
		'data-format': firstSlide.format
	} : {};

	const slide = firstSlide ? (
		<SlideImageContainer>
			<SlideBlurBackground
				loaded
				url={url}
				hidden={false}
			/>
			<SlideImage>
				<img src={url} {...slideDataAttributes} />
			</SlideImage>
		</SlideImageContainer>
	) : (
		<SlideshowCallToAction>
			<h1>There are no slides in this slideshow yet.</h1>
			<button className="button js_add-slide">Add slides</button>
		</SlideshowCallToAction>
	);

	return (
		<EnsureDefaultTheme>
			<SlideshowInset
				className="slideshow-inset js_slideshow"
				contentEditable={false} {...thumbnailProps}
				data-current-slide-index="0"
				data-slides={JSON.stringify(slides)}
				data-aspect={aspectRatio}
			>
				<SlideShowContainer
					wide={aspectRatio === 'Wide'}
					className="js_kinja-slideshow"
				>

					<KinjaSlide className="js_slide">
						<SlideContainer wide={aspectRatio === 'Wide'}>
							{slide}
							{firstSlide && toolbar}
						</SlideContainer>
						{captionAndAttribution}
					</KinjaSlide>

					<SlideshowNavigateLeft
						icon={
							<ArrowLeftIcon />
						}
						sort='circle'
						weight={'tertiary'}
						className="button js_page-left"
					/>

					<SlideshowNavigateRight
						icon={
							<ArrowRightIcon />
						}
						sort='circle'
						weight={'tertiary'}
						className="button js_page-right"
					/>

					<SlideshowIndex>
						<SlideshowIndexPaging>
							<SlideshowIcon /> {currentSlideIndex ? currentSlideIndex + 1 : 1} / {slides.length}
						</SlideshowIndexPaging>
					</SlideshowIndex>

				</SlideShowContainer>
			</SlideshowInset>
		</EnsureDefaultTheme>
	);
};

export default SlideshowInEditor;
