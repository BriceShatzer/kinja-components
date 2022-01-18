/* eslint-disable flowtype/no-types-missing-file-annotation */

import * as React from 'react';
import CaptionContainer from '../../caption-container';
import ImageAttributionContainer from '../../image-attribution-container';

import imageUrl from 'kinja-images/imageUrl';

import type { ImageOptions } from 'postbody/blockNodes/ImageNode';
import type { MediaAlignment } from 'postbody/MediaAlignment';

const getSize = (
	useAutoFormat: boolean,
	alignment: MediaAlignment,
	isMediaLarge: boolean,
	isMediaMedium: boolean
): string => {
	if (isMediaMedium) {
		return useAutoFormat ? 'KinjaUncroppedMediumAuto' : 'KinjaUncroppedMedium';
	} else if (isMediaLarge) {
		switch (alignment) {
			case 'Left':
			case 'Right':
				return useAutoFormat ? 'KinjaUncroppedLargeAuto' : 'KinjaUncroppedLarge';
			case 'Center':
				return useAutoFormat ? 'KinjaUncroppedExtraLargeAuto' : 'KinjaUncroppedExtraLarge';
			default:
				return useAutoFormat ? 'UncroppedWideExtraLargeAuto' : 'UncroppedWideExtraLarge';
		}
	} else {
		return 'Original';
	}
};

const RssImageNode1 = ({
	id,
	format,
	width,
	alignment,
	caption,
	attribution
}: ImageOptions) => {
	const isAnimated = format === 'gif';
	const isMediaLarge = width > 799;
	const isMediaMedium = width > 399 && width <= 799;

	// Check to use when we want an image URL that is never animated (e.g. "frozen", still image)
	// We can't use f_auto for these images, or Cloudinary will return an animation instead of our intended frozen image.
	const size = getSize(!isAnimated, alignment, isMediaLarge, isMediaMedium);

	const hasCaption = Boolean(caption && caption.length);
	const hasAttribution = Boolean(attribution && attribution.length);

	return (
		<figure>
			<img src={imageUrl(id, size, isAnimated ? 'jpg' : format)}
				width={width > 600 ? 600 : undefined}
			/>
			{hasCaption && caption ?
				<CaptionContainer
					caption={caption}
					editable={false}
				/>
				: null}
			{hasAttribution && attribution ?
				<ImageAttributionContainer
					hasCaption={hasCaption}
					attribution={attribution}
					editable={false}
				/>
				: null}
		</figure>
	);
};

export default RssImageNode1;
