// @flow
import * as React from 'react';
import cx from 'classnames';
import styled, { css } from 'styled-components';

import OnScreen from '../../hoc/on-screen';
import media from '../../../style-utils/media';
import imageUrl from 'kinja-images/imageUrl';
import getTransforms from 'kinja-images/transforms/permalink';
import type { FullBleedWidgetOptions } from 'postbody/blockNodes/FullBleedWidget';
import type { OnScreenInjectedProps } from '../../hoc/on-screen';
import type { Locale } from 'kinja-magma/models/Locale';
import { ResponsiveImage } from '../../elements/image';
import type SimpleImage from 'kinja-magma/models/SimpleImage';
import CaptionContainer from '../../caption-container';
import ImageAttributionContainer from '../../image-attribution-container';

export type Props = FullBleedWidgetOptions & OnScreenInjectedProps & {
	// Flag to render the attribution if it exists (defaults to true)
	attributionsEnabled?: boolean,
	// Flag to render the caption if it exists (defaults to true)
	captionsEnabled?: boolean,
	editable?: boolean,
	language?: Locale
};

const LARGEWIDTH = 800;
const animation = 'cubic-bezier(0.6, 0.2, 0.1, 1)';

const FullBleedOverlay = styled.div`
	-webkit-tap-highlight-color: transparent;
	align-items: center;
	bottom: 0;
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	overflow: hidden;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 2;
`;

const FullBleedOverlayContent = styled.div`
	color: ${props => props.theme.color.white};
	max-width: 830px;
	width: 100%;
	z-index: 3;
`;

const FadeInUp = styled.div`
	transition-timing-function: ${animation};
	transition-duration: 1s;
	transition-property: opacity, transform;

	${props => props.isVisible ? `
		opacity: 1;
		transform: translateY(0) scale(1);
		transition-delay: 0.5s;
	` : `
		opacity: 0;
		transform: translateY(80px) scale(1);
		transition-delay: 0s;
	`}
`;

const Overlay = ({ overlay, editable, isVisible }: { overlay: SimpleImage, editable?: boolean } & OnScreenInjectedProps) => {
	const overlayTransforms = getTransforms(LARGEWIDTH, overlay.format, 'Bleed');
	const overlayImageTransform = overlayTransforms.superLarge || overlayTransforms.large;
	const overlaySrc = imageUrl(overlay.id, overlayImageTransform, overlay.format);

	return <FullBleedOverlay className='full-bleed-overlay'>
		<FullBleedOverlayContent className='full-bleed-overlay-content'>
			<FadeInUp className='fade-in-up' isVisible={isVisible}>
				{!editable ?
					<ResponsiveImage
						id={overlay.id}
						format={overlay.format}
						transform={overlayImageTransform}
						width={LARGEWIDTH}
						relative
						noLazy
					/>
					:
					<img
						className='lazyload'
						src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
						data-src={overlaySrc}
						data-id={overlay.id}
						data-format={overlay.format}
					/>
				}
			</FadeInUp>
		</FullBleedOverlayContent>
	</FullBleedOverlay>;
};

const FullBleedImageContainer = styled.div`
	transition: opacity 1s ${animation} 0s;

	${props => props.isVisible ? `
		opacity: 1;
	` : `
		opacity: 0;
	`}

	img,
	video {
		display: block;
		height: 100%;
		position: relative;
		width: 100%;
	}

	${props => props.hasOverlay && `
		img {
			-o-object-fit: cover;
			object-fit: cover;
			min-height: 400px;
		}
	`}
`;

export const FullBleedContainer = styled.div`
	left: 50%;
	margin-left: -50vw;
	margin-right: -50vw;
	position: relative;
	right: 50%;
	width: 100vw;

	${props => props.isParallax && css`
		background-image: url('${props => props.imageSrc}');
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: 300% 0;
	`}

	${media.largeUp`
		${props => props.isParallax && `
			background-position: center center !important;
		`}
	`}

	${media.largeUp`
		${props => props.isParallax && `
			background-position: center center !important;

			${FullBleedImageContainer} {
				img {
					visibility: hidden !important;
					width: 100%;
				}
			}
		`}
	`}
`;

export function FullBleedWidget({
	anchorTag,
	attribution,
	attributionsEnabled = true,
	caption,
	captionsEnabled = true,
	image,
	isParallax,
	overlay,
	editable,
	isVisible,
	language
}: Props) {
	const transforms = getTransforms(LARGEWIDTH, image.format, 'Bleed');
	let imageTransform = transforms.superLarge || transforms.large;
	const isAnimated = image.format === 'gif';
	if (isAnimated) {
		imageTransform = 'WideSuperLargeAutoFrozen';
	}

	const imageSrc = imageUrl(image.id, imageTransform, isAnimated ? 'jpg' : image.format);

	const editableImageOrVideo = isAnimated ? (
		<video autoPlay playsInline loop muted
			className={`full-bleed-gif-video full-bleed-image lazyload ${overlay && overlay.id ? 'has-overlay' : ''}`}
			data-id={image.id}
			data-format={image.format}
			data-poster={imageSrc}>
			<source type="video/mp4" src={imageUrl(image.id, 'WideSuperLarge', 'mp4')} />
			<source type="video/webm" src={imageUrl(image.id, 'WideSuperLarge', 'webm')} />
		</video>
	) : (
		<img
			src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
			className={cx('full-bleed-image', 'lazyload', { 'has-overlay': overlay && overlay.id })}
			data-id={image.id}
			data-format={image.format}
			data-src={imageSrc}
		/>
	);

	return (
		<figure
			className={cx('full-bleed-widget', {
				'js_full-bleed-widget': editable,
				parallax: isParallax,
				'anchor-tag': anchorTag
			})}
			id={anchorTag}
			data-isparallax={isParallax}
		>
			<FullBleedContainer isParallax={isParallax} imageSrc={imageSrc} className='full-bleed-container'>

				{!editable ?
					<FullBleedImageContainer isVisible={isVisible}>
						<ResponsiveImage
							id={image.id}
							format={image.format}
							width={Infinity}
							relative
							noLazy
						/>
					</FullBleedImageContainer>
					:
					editableImageOrVideo
				}

				{overlay && overlay.id &&
					<Overlay overlay={overlay} editable={editable} isVisible={isVisible} />
				}

			</FullBleedContainer>

			{captionsEnabled && caption && caption.length > 0 && (
				<CaptionContainer
					caption={caption}
					editable={editable}
				/>
			)}
			{attributionsEnabled && attribution && attribution.length > 0 && (
				<ImageAttributionContainer
					attribution={attribution}
					hasCaption={Boolean(caption && caption.length)}
					editable={editable}
					language={language}
				/>
			)}
		</figure>
	);
}

export default OnScreen(FullBleedWidget, {
	partialVisibility: true,
	offset: -160
});
