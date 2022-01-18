/* @flow */

import * as React from 'react';
import Button from '../../buttons';

// ICONS
import ImageIcon from '../../icon19/Image';
import TrashcanIcon from '../../icon19/Trashcan';

import { ImagePlaceholder, FullbleedImagePlaceholder } from '../styles';
import ImageNode from 'postbody/blockNodes/ImageNode';
import { LunchboxImage } from '../read-only';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import WithFloatingToolbar from '../../toolbar-floating/with-floating-toolbar';
import type { Props as ToolbarItemProps } from '../../toolbar-item/toolbar-item';

function getToolbarItems({ deleteImage, handleMediaUpload }): Array<ToolbarItemProps> {
	return [
		{ title: 'change image', showTitle: false, onClick: handleMediaUpload, icon: <ImageIcon /> },
		{
			title: 'delete image',
			showTitle: false,
			onClick: () => deleteImage(),
			icon: <TrashcanIcon />
		}
	];
}

export default function LunchboxImageEditor({
	image,
	handleMediaUpload,
	currentLayout,
	deleteImage,
	showToolbar
}: {
	image?: ?ImageNode,
	handleMediaUpload: () => void,
	deleteImage: () => void,
	currentLayout: LunchboxLayoutType,
	showToolbar: boolean
}) {
	if (image) {
		return (
			<WithFloatingToolbar showToolbar={showToolbar} toolbarPosition="Right" toolbarItems={getToolbarItems({ deleteImage, handleMediaUpload })}>
				<LunchboxImage image={image} currentLayout={currentLayout} isVisible />
			</WithFloatingToolbar>
		);
	}
	const Placeholder =
		[Lunchbox.Layouts.Image.Bleed, Lunchbox.Layouts.Image.Parallax].includes(currentLayout) || Lunchbox.Layouts.Hero.include(currentLayout)
			? FullbleedImagePlaceholder
			: ImagePlaceholder;
	return (
		<Placeholder>
			<Button onClick={handleMediaUpload} icon={<ImageIcon />} weight="secondary" />
		</Placeholder>
	);
}
