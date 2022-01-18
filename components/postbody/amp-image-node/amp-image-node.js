// @flow

import * as React from 'react';

import imageUrl from 'kinja-images/imageUrl';

import type { ImageOptions } from 'postbody/blockNodes/ImageNode';
import CaptionContainer from '../../caption-container';
import ImageAttributionContainer from '../../image-attribution-container';

type AmpImageNodeProps = ImageOptions & {
	// Localization language
	language?: string,
	// Render caption if true. (defaults to true)
	captionsEnabled?: boolean,
	// Render attribution if true. (defaults to true)
	attributionsEnabled?: boolean,
}

const AmpImageNode = ({
	id,
	width,
	height,
	format,
	caption,
	attribution,
	language,
	captionsEnabled = true,
	attributionsEnabled = true
}: AmpImageNodeProps) => {
	const contentWidth = 800;
	const imageHeight = Math.round(contentWidth * height / width);
	const showCaption = captionsEnabled && caption && caption.length > 0;
	const showAttribution = attributionsEnabled && attribution && attribution.length > 0;

	const isAnimated = ['gif'].includes(format.toLowerCase());

	const imageTransform = width >= 800 ? 'UncroppedWideExtraLargeAuto' : 'OriginalAuto';
	const videoTransform = width >= 800 ? 'UncroppedWideExtraLarge' : 'Original';
	const videoPoster = imageUrl(id, imageTransform, 'jpg');

	return (
		<figure>
			{isAnimated &&
				<amp-video
					autoplay='' loop='' muted='' width={contentWidth} height={imageHeight} layout="responsive" poster={videoPoster}>
					<source type="video/mp4" src={imageUrl(id, videoTransform, 'mp4')}/>
					<source type="video/webm" src={imageUrl(id, videoTransform, 'webm')}/>
				</amp-video>
			}
			{!isAnimated &&
				<amp-img
					src={imageUrl(id, 'UncroppedWideExtraLargeAutoFrozen', format)}
					width={contentWidth}
					height={imageHeight}
					layout='responsive'
				/>
			}
			{showCaption && caption && <CaptionContainer
				caption={caption}
				editable={false}
			/>}
			{showAttribution && attribution && <ImageAttributionContainer
				hasCaption={Boolean(caption && caption.length)}
				attribution={attribution}
				editable={false}
				language={language}
			/>}
		</figure>
	);
};

export default AmpImageNode;
