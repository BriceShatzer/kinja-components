/* @flow */

import * as React from 'react';
import imageUrl from 'kinja-images/imageUrl';
import type { TransformName } from 'kinja-images/types';
import OnScreen from '../hoc/on-screen';
import { placeholderSrc } from './image';
import type { ImageFormat, ImageDataAttribues } from 'postbody/Image';
import type { OnScreenInjectedProps } from '../hoc/on-screen';

type VideoOption = 'autoPlay' | 'playsInline' | 'loop' | 'muted';

export const DefaultVideoOptions = ['autoPlay', 'playsInline', 'loop', 'muted'];

/*
 * Lazily-loaded animated GIF using video tags
 */
const LazyVideo = ({
	id,
	isVisible,
	mp4Url,
	noLazy,
	posterFormat,
	posterTransform,
	posterUrl,
	transform,
	videoOptions = DefaultVideoOptions,
	webmUrl,
	dataAttributes,
	...props
}: {
	// The id for the image, to be used to get the animated and non-animated poster
	id?: ?string,
	// Optional override for mp4 source
	mp4Url?: ?string,
	// Whether to render lazily or not and show placeholder until in-frame
	noLazy?: boolean,
	// The format of the image to be used as the poster frame
	posterFormat?: ImageFormat,
	// The transform to use for the poster image
	posterTransform?: TransformName,
	// Optional override for poster source
	posterUrl?: ?string,
	// Transform
	transform?: TransformName,
	// Optional overrides for th default video attributes
	videoOptions?: Array<VideoOption>,
	// Optional override for webm source
	webmUrl?: ?string,
	dataAttributes?: ImageDataAttribues,
	onCanPlay?: () => void,
	// Optional additional attributes to apply to the video tag
	props?: mixed
} & OnScreenInjectedProps) => {
	// If source is not specified, get urls to media
	const posterSrc = posterUrl || id && posterTransform && posterFormat && imageUrl(id, posterTransform, posterFormat);
	const mp4Src = mp4Url || id && transform && imageUrl(id, transform, 'mp4');
	const webmSrc = webmUrl || id && transform && imageUrl(id, transform, 'webm');

	// Existence of attribute implies true
	const videoProps = videoOptions.reduce((obj, option) => {
		obj[option] = true;
		return obj;
	}, {});

	return ((noLazy || isVisible) ? (
		<video poster={posterSrc} {...videoProps} {...props} {...dataAttributes}>
			{mp4Src && <source type='video/mp4' src={mp4Src} />}
			{webmSrc && <source type='video/webm' src={webmSrc} />}
		</video>
	) : (
		<img src={placeholderSrc} {...props} {...dataAttributes} />
	));
};

const Video = OnScreen(LazyVideo, { offset: 150, once: true, partialVisibility: true });

export default Video;
