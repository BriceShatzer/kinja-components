// @flow

import * as React from 'react';
import styled from 'styled-components';

import imageUrl from 'kinja-images/imageUrl';
import CaptionContainer from '../../caption-container';
import ImageAttributionContainer from '../../image-attribution-container';

import type { FullBleedWidgetOptions } from 'postbody/blockNodes/FullBleedWidget';
import type { Locale } from 'kinja-magma/models/Locale';

export type AmpFullBleedWidgetProps = FullBleedWidgetOptions & {
	// Flag to render the attribution if it exists (defaults to true)
	attributionsEnabled?: boolean,
	// Flag to render the caption if it exists (defaults to true)
	captionsEnabled?: boolean,
	language?: Locale
};

const Container = styled.figure`
	amp-img,
	amp-video {
		position: relative;
		padding-top: 56.25%;
		img {
			object-fit: cover;
		}
	}
`;

const AmpFullBleedWidget = ({
	image,
	caption,
	attribution,
	language,
	captionsEnabled = true,
	attributionsEnabled = true
}: AmpFullBleedWidgetProps) => {

	const isAnimated = ['gif'].includes(image.format.toLowerCase());
	const imageTransform = 'WideSuperLargeAuto';
	const videoTransform = 'WideSuperLarge';
	const posterTransform = 'WideSuperLarge';

	const showCaption = captionsEnabled && caption && caption.length > 0;
	const showAttribution = attributionsEnabled && attribution && attribution.length > 0;

	return (
		<Container>
			{isAnimated &&
				<amp-video autoplay='' loop='' muted=''
					layout="responsive"
					width="1600"
					height="900"
					poster={imageUrl(image.id, posterTransform, 'jpg')}
				>
					<source type="video/mp4" src={imageUrl(image.id, videoTransform, 'mp4')}/>
					<source type="video/webm" src={imageUrl(image.id, videoTransform, 'webm')}/>
				</amp-video>
			}
			{!isAnimated &&
				<amp-img
					src={imageUrl(image.id, imageTransform, image.format)}
					layout="fill"
				></amp-img>
			}
			{showCaption && caption && <CaptionContainer
				caption={caption}
			/>}
			{showAttribution && attribution && <ImageAttributionContainer
				hasCaption={Boolean(caption && caption.length)}
				attribution={attribution}
				language={language}
			/>}
		</Container>
	);
};

export default AmpFullBleedWidget;
