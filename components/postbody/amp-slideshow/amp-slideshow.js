// @flow

import * as React from 'react';
import styled from 'styled-components';

import imageUrl from 'kinja-images/imageUrl';
import getTransforms from 'kinja-images/transforms/permalink';
import InlineNodes from '../inline-node';

import type ImageNode from 'postbody/blockNodes/ImageNode';
import { type SlideshowAspectRatio } from 'postbody/blockNodes/Slideshow';

const captionHeight = '150px';

const AmpSlide = styled.div`
	background: ${props => props.theme.color.darksmoke};
`;

const AmpSlideImage = styled.div`
	height: calc(100% - ${captionHeight});
	width: 100%;
	display: flex;

	amp-img {
		max-width: 100%;
		max-height: 100%;
		width: 100%;

		img {
			object-fit: contain;
		}
	}
`;

const AmpSlideCaption = styled.div`
	background: ${props => props.theme.color.whitesmoke};
	color: ${props => props.theme.color.darksmoke};
	font-family: ${props => props.theme.typography.utility.fontFamily};
	font-size: 16px;
	line-height: 21px;
	margin: 0 auto;
	padding: 18px;
	width: 100%;
	height: ${captionHeight};
	overflow: auto;
`;

const AmpSlideshow = ({
	slides,
	aspectRatio
}: {
	slides: Array<ImageNode>,
	aspectRatio: SlideshowAspectRatio
}) => {
	return (
		<amp-carousel
			layout="responsive"
			type="slides"
			width="400"
			height={aspectRatio === 'Wide' ? '375' : '416'}
		>
			{slides.map(slide => {
				const imageTransform = getTransforms(slide.width, slide.format, slide.alignment);
				const defaultSize = imageTransform.superLarge || imageTransform.default;
				const src = imageUrl(slide.id, defaultSize, slide.format);

				return (
					<AmpSlide key={slide.id}>
						<AmpSlideImage>
							<amp-img
								src={src}
								layout="responsive"
								width={slide.width}
								height={slide.height}
								alt="">
							</amp-img>
						</AmpSlideImage>
						<AmpSlideCaption>
							{slide.caption && slide.caption.length > 0 &&
								<InlineNodes nodes={slide.caption} renderer='amp' />
							}
						</AmpSlideCaption>
					</AmpSlide>
				);
			}
			)}

		</amp-carousel>
	);
};

export default AmpSlideshow;
