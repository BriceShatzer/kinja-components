/* @flow */

import * as React from 'react';
import ImageNode from 'postbody/blockNodes/ImageNode';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import {
	LunchboxImageWrapper,
	LunchboxImageTextImageWrapper,
	AnimatedLunchboxImageTextImageWrapper,
	InlineImageWrapper,
	FullBleedImageWrapper,
	LunchboxImagePaddingWrapper
} from '../styles';
import ParallaxImage from '../../elements/parallax';
import { LazyResponsiveImage } from '../../elements/image';
import Link from '../../elements/link';
import { LinkNode } from 'postbody/InlineNode';
import type { OnScreenInjectedProps } from '../../hoc/on-screen';
import type { BlogId } from 'kinja-magma/models/Id';

type LunchboxImageProps = {
	image: ImageNode,
	currentLayout: LunchboxLayoutType,
	relative?: boolean,
	isAnimated?: ?boolean,
	link?: ?LinkNode,
	blogId?: ?BlogId
};
export default function LunchboxImage({
	image,
	currentLayout,
	relative,
	isVisible,
	isAnimated,
	link,
	blogId }: LunchboxImageProps & OnScreenInjectedProps) {
	const { id, format, width, height } = image;
	const paddingBottom = Math.round(height / width * 1000) / 10;
	let ImageWrapper;

	if (Lunchbox.Layouts.Image.Inline === currentLayout) {
		ImageWrapper = InlineImageWrapper;
	} else if (Lunchbox.Layouts.Image.Bleed === currentLayout) {
		ImageWrapper = FullBleedImageWrapper;
	} else if (Lunchbox.Layouts.Hero.include(currentLayout)) {
		ImageWrapper = InlineImageWrapper;
	} else if (Lunchbox.Layouts.ImageText.include(currentLayout)) {
		ImageWrapper = isAnimated ? AnimatedLunchboxImageTextImageWrapper : LunchboxImageTextImageWrapper;
	} else {
		ImageWrapper = LunchboxImageWrapper;
	}

	const ImageComponent = () =>
		currentLayout === Lunchbox.Layouts.Image.Parallax ? (
			<ParallaxImage id={id} format={format} />
		) : <LunchboxImagePaddingWrapper paddingBottom={relative ? null : paddingBottom}>
			<LazyResponsiveImage
				id={id}
				format={format}
				width={width}
				showBackground={false}
				noLazy
				relative={relative}
			/>
		</LunchboxImagePaddingWrapper>;

	return (
		<ImageWrapper
			isVisible={isVisible}
			origin='bottom'
			animateFirst={currentLayout.includes('Right')}
		>
			{link ? (
				<Link
					href={blogId ? `${link.reference}?customKinja=${blogId}` : link.reference}
					target={link.target}
					events={[['Special Sections', 'Image click', `${link.reference}`]]}
				>
					<ImageComponent />
				</Link>
			) : (
				<ImageComponent />
			)}
		</ImageWrapper>
	);
}
