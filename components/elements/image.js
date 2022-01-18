/* @flow */

import * as React from 'react';
import imageUrl from 'kinja-images/imageUrl';
import { omit } from 'lodash';

import { imageFormatFromString, type ImageFormat } from 'postbody/Image';
import ImageSizes, { type ImageSizesT, type ImageTransformsT } from 'kinja-images/config/image-sizes';
import OnScreen from '../hoc/on-screen';
import type { OnScreenInjectedProps } from '../hoc/on-screen';
import {
	withPlatform,
	type PlatformInjectedProps,
	withFeatures,
	type FeaturesInjectedProps
} from '../hoc/context';

export const placeholderSrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

const MEDIA_SIZES: Array<ImageTransformsT> = ['KinjaCenteredMediumAuto', 'KinjaCenteredLargeAuto',
	'CenteredWideExtraLargeAuto', 'CenteredWideExtraBigAuto', 'CenteredWideSuperLarge', 'AvatarSmallAuto'];
export const UNCROPPED_MEDIA_SIZES: Array<ImageTransformsT> =
	['AvatarSmallAuto', 'KinjaUncroppedMedium', 'KinjaUncroppedLargeAuto', 'UncroppedWideExtraLargeAuto', 'WideSuperLargeAuto'];
export const MIN_IMAGE_WIDTH = 320;
export const MAX_POST_IMAGE_WIDTH = typeof window !== 'undefined' ? Math.min(636, window.innerWidth) : 636;
export const MAX_LEFT_OF_HEADLINE_IMAGE_WIDTH = 450;
export const MAX_SIDEBAR_IMAGE_WIDTH = 450;

type LazyImageProps = {
	// Image alt attribute
	alt?: string,
	// Image aria-label attribute
	ariaLabel?: string,
	// Whether or not to disable animation & fetch as a jpg
	noAnimate?: boolean,
	// Whether to allow lazy loading via OnScreen props
	noLazy?: boolean,
	width?: number,
	height?: number
};

export type LazyResponsiveImageProps = LazyImageProps &
	PlatformInjectedProps &
	FeaturesInjectedProps &
	OnScreenInjectedProps & {
		// Optional function prop to trigger when image is loaded
		onLoad?: () => void,
		// Optional function prop to trigger when video is loaded
		onCanPlay?: () => void,
		// The image format of the image
		format?: ImageFormat,
		// The id of the image
		id: string,
		//  Whether to show cropped image
		croppedImage?: boolean,
		// Prop for the image to tell the browser which image to choose from the srcset
		// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes
		sizes?: string,
		transform?: string,
		animated?: boolean,
		draggable?: boolean | 'auto',
		kinjaMeta?: {
			features?: ?{ [name: string]: boolean }
		}
	};

/*
 * A lazy-loading image element that takes a source url
 */
const Image = ({
	id,
	format = 'jpg',
	transform = 'KinjaCenteredExtraLarge',
	onImageLoaded,
	...props
}: LazyImageProps &
	OnScreenInjectedProps & {
		// Cloudinary ID (if applicable)
		id?: string,
		format?: ImageFormat,
		transform?: string,
		props?: mixed,
		onImageLoaded?: () => void
	}) => {
	if (id) {
		return <img
			src={imageUrl(id, transform, imageFormatFromString(format))}
			{...omit(props, 'isVisible')}
			onLoad={onImageLoaded} />;
	} else {
		return null;
	}
};

export const calcSrcSet = (
	imageSizes: ImageSizesT,
	transforms: Array<ImageTransformsT>,
	id: string,
	ensuredFormat?: ImageFormat,
	noAnimate?: boolean,
	imageWidth?: number,
	returnFullSet?: boolean): Array<string> => {

	return transforms.reduce((acc, transform) => {
		const transformWidth = parseInt(imageSizes[transform].width, 10);
		// 1.3 is to allow some range
		if (!transformWidth || !returnFullSet && imageWidth && transformWidth / 1.2 > imageWidth) {
			return acc;
		}
		const sourceUrl = imageUrl(id, transform, noAnimate ? 'jpg' : ensuredFormat);
		return acc.concat([`${sourceUrl} ${transformWidth}w`]);
	}, []);
};

function ResponsiveImage(props: LazyResponsiveImageProps) {
	const {
		id,
		format = 'jpg',
		width,
		height,
		noLazy,
		alt,
		sizes,
		transform,
		noAnimate,
		ariaLabel,
		croppedImage = false,
		platform,
		draggable = 'auto'
	} = props;
	const ensuredFormat = imageFormatFromString(format);
	const posterTransform = transform || 'KinjaCenteredLargeAutoFrozen';
	const animatedTransform = transform || 'KinjaCenteredExtraLarge';
	const animated = ensuredFormat && ['gif'].includes(ensuredFormat);
	const transforms = croppedImage ? MEDIA_SIZES : UNCROPPED_MEDIA_SIZES;
	const imageWidth = width && width < MIN_IMAGE_WIDTH ? MIN_IMAGE_WIDTH : width;
	const srcSet = calcSrcSet(ImageSizes, transforms, id, ensuredFormat, noAnimate, imageWidth, Boolean(sizes));

	if (platform === 'amp') {
		return (
			<amp-img
				srcSet={animated ? srcSet[0] : srcSet.join(', ')}
				width={width}
				height={height}
				layout='responsive'
			/>
		);
	}

	const webmSrc = id && imageUrl(id, animatedTransform, 'webm');
	const mp4Src = id && imageUrl(id, animatedTransform, 'mp4');
	const posterSrc = id && imageUrl(id, posterTransform, 'jpg');
	const videoAttributes = {
		loop: true,
		autoPlay: true,
		muted: true,
		playsInline: true
	};
	const attributesForLightbox = {
		'data-chomp-id': id,
		'data-format': format,
		'data-alt': alt,
		'data-anim-src': animated ? posterSrc : ''
	};

	// not lazy loaded image and animated video
	if (noLazy) {
		if (animated) {
			return (
				<video
					poster={posterSrc}
					{...videoAttributes}
					{...attributesForLightbox}
				>
					{mp4Src && <source type='video/mp4' src={mp4Src} />}
					{webmSrc && <source type='video/webm' src={webmSrc} />}
				</video>
			);
		} else {
			return (
				<img
					src={placeholderSrc}
					srcSet={srcSet.join(', ')}
					sizes={sizes}
					alt={alt}
					aria-label={ariaLabel}
					draggable={draggable}
					{...attributesForLightbox}
				/>
			);
		}
	}

	// lazy loaded image and animated video
	if (animated) {
		return (
			<video
				poster={placeholderSrc}
				data-webmsrc={webmSrc}
				data-mp4src={mp4Src}
				data-postersrc={posterSrc}
				{...videoAttributes}
				{...attributesForLightbox}
			/>
		);
	} else {
		return (
			<img
				src={placeholderSrc}
				alt={alt}
				data-srcset={srcSet.join(', ')}
				sizes={sizes}
				aria-label={ariaLabel}
				draggable={draggable}
				{...attributesForLightbox}
			/>
		);
	}
}

const LazyImage = OnScreen(Image, { offset: 100 });
const LazyResponsiveImage = withPlatform(withFeatures(OnScreen(
	ResponsiveImage, { offset: 200, once: true, partialVisibility: true }
)));

export default LazyImage;
export { ResponsiveImage, Image, LazyResponsiveImage };
