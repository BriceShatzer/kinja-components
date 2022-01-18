/* @flow */

import * as React from 'react';
import VideoThumbnail from '../../video-thumbnail';
import { LazyResponsiveImage, MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH } from '../../elements/image';

import type HeadlineImage from 'kinja-magma/models/HeadlineImage';

type VideoImageOrThumbnailProps = {
	image: HeadlineImage,
	isAboveHeadline?: boolean,
	showVideoThumbnail: ?boolean,
	croppedImage?: boolean,
	isLeftOfHeadline?: boolean,
	noLazy?: boolean,
	draggable?: boolean | 'auto',
	sizes?: string
};

const VideoImageOrThumbnail = ({
	image,
	isAboveHeadline = false,
	showVideoThumbnail,
	croppedImage = false,
	isLeftOfHeadline = false,
	noLazy = false,
	draggable,
	sizes
}: VideoImageOrThumbnailProps): React$Node => {
	const defaultTransform = croppedImage ? 'CenteredWideExtraLargeAuto' : 'UncroppedWideExtraLargeAuto';
	const width = isLeftOfHeadline ? MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH : image.width;
	const height = isLeftOfHeadline ? MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH * 9 / 16 : image.height;

	return (image ?
		<React.Fragment>
			{!showVideoThumbnail && image && (
				<LazyResponsiveImage
					id={image.id}
					format={image.format}
					transform={isLeftOfHeadline ? defaultTransform : 'KinjaUncroppedLargeAuto'}
					width={width}
					height={height}
					croppedImage={croppedImage}
					noLazy={noLazy}
					draggable={draggable}
					sizes={sizes}
				/>
			)}
			{!image.isAnimated && showVideoThumbnail && (
				<VideoThumbnail
					thumbnailId={image.id}
					standalone={isAboveHeadline}
					width={width}
					height={height}
					preventFullsize
					draggable={draggable}
					sizes={sizes}
					noLazy={noLazy}
				/>
			)}
		</React.Fragment> : null
	);
};

export default VideoImageOrThumbnail;
