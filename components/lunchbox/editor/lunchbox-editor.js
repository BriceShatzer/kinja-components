/* @flow */

import * as React from 'react';
import LunchboxTextEditor from './lunchbox-text-editor';
import LunchboxImageEditor from './lunchbox-image-editor';
import LunchboxToolbar from './lunchbox-toolbar';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import type { LunchboxEditorProps } from 'kinja-magma/models/Lunchbox';
import type { LunchboxEditorEventHandlers } from '../types';
import LunchboxWrapper from '../lunchbox-wrapper';
import LunchboxLink from '../read-only/lunchbox-link';
import { Gutter } from '../styles';

export default function LunchboxEditor(props: LunchboxEditorProps & LunchboxEditorEventHandlers) {
	const {
		backgroundColor,
		currentLayout,
		headerText,
		image,
		paragraphText,
		handleMediaUpload,
		deleteImage,
		handleUpdateHeader,
		handleUpdateParagraph,
		handleUpdateLayout,
		showToolbar,
		textAlignment,
		button
	} = props;
	return (
		<LunchboxWrapper backgroundColor={backgroundColor} currentLayout={currentLayout}>
			{showToolbar && <LunchboxToolbar currentLayout={currentLayout} onClick={handleUpdateLayout} />}
			{!Lunchbox.Layouts.Image.include(currentLayout) && (
				<LunchboxTextEditor
					currentLayout={currentLayout}
					headerText={headerText}
					paragraphText={paragraphText}
					handleUpdateHeader={handleUpdateHeader}
					handleUpdateParagraph={handleUpdateParagraph}
					textAlignment={textAlignment}
					link={button}
				/>
			)}
			{Lunchbox.Layouts.ImageText.include(currentLayout) && <Gutter />}
			{!Lunchbox.Layouts.Text.include(currentLayout) && (
				<LunchboxImageEditor
					image={image}
					handleMediaUpload={handleMediaUpload}
					currentLayout={currentLayout}
					deleteImage={deleteImage}
					showToolbar={Boolean(showToolbar)}
				/>
			)}
			{button && Lunchbox.Layouts.Image.include(currentLayout) && (
				<LunchboxLink link={button} currentLayout={currentLayout} textAlignment={textAlignment} />
			)}
		</LunchboxWrapper>
	);
}

LunchboxEditor.defaultProps = {
	showToolbar: false
};
