/* @flow */

import * as React from 'react';
import { Textarea } from '../../form';
import Lunchbox from 'kinja-magma/models/Lunchbox';
import type { LunchboxLayoutType } from 'kinja-magma/models/LunchboxLayoutGroup';
import { LinkNode } from 'postbody/InlineNode';
import { LunchboxTextWrapper, LunchboxImageTextTextWrapper } from '../styles';
import type { HeaderAlignment } from 'postbody/blockNodes/Header';

import LunchboxLink from '../read-only/lunchbox-link';

type LunchboxTextEditorProps = {
	currentLayout: LunchboxLayoutType,
	handleUpdateHeader: (props: { headerText: string }) => void,
	handleUpdateParagraph: (props: { paragraphText: string }) => void,
	headerText?: string,
	paragraphText?: string,
	textAlignment?: HeaderAlignment,
	link?: LinkNode
};

export default function LunchboxTextEditor(props: LunchboxTextEditorProps) {
	const { currentLayout, handleUpdateHeader, handleUpdateParagraph, headerText, paragraphText, textAlignment, link } = props;
	const TextWrapper = Lunchbox.Layouts.ImageText.include(currentLayout) ? LunchboxImageTextTextWrapper : LunchboxTextWrapper;
	const headerFilter = layout => layout.indexOf('Header') > 0;
	const shouldRenderHeader = Lunchbox.Layouts.include(currentLayout, headerFilter);

	const paragraphFilter = layout => layout.indexOf('Paragraph') > 0;
	const shouldRenderGraf = Lunchbox.Layouts.include(currentLayout, paragraphFilter);

	return (
		<TextWrapper headerTextAlignment={textAlignment} paragraphTextAlignment={textAlignment}>
			{shouldRenderHeader && (
				<Textarea
					inlineHelp=""
					label=""
					name="Header"
					onChange={headerText => handleUpdateHeader({ headerText })}
					placeholder="header"
					value={headerText}
					autogrow
				/>
			)}
			{shouldRenderGraf && (
				<Textarea
					name="Paragraph"
					onChange={paragraphText => handleUpdateParagraph({ paragraphText })}
					value={paragraphText}
					placeholder="Paragraph"
					autogrow
				/>
			)}
			{link && !Lunchbox.Layouts.Image.include(currentLayout) && <LunchboxLink link={link} currentLayout={currentLayout} textAlignment={textAlignment} />}
		</TextWrapper>
	);
}
