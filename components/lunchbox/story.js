/* @flow */

import * as React from 'react';
import { storiesOf, withDocs, WithState, color, select, number, action, boolean, text } from 'base-storybook';
import Lunchbox from './read-only/';
import LunchboxEditor from './editor/';
import README from './README.md';
import LunchboxModel from 'kinja-magma/models/Lunchbox';
import LunchboxParagraph from 'kinja-magma/models/LunchboxParagraph';
import { TextNode, LinkNode } from 'postbody/InlineNode';
import Header from 'postbody/blockNodes/Header';
import Paragraph from 'postbody/blockNodes/Paragraph';
import ImageNode from 'postbody/blockNodes/ImageNode';
import WithFloatingToolbar from '../toolbar-floating/with-floating-toolbar';
import SpecialSectionStreamToolbarConfig from '../special-section-page/editor/stream/special-section-stream-toolbar-config';

const textNodes = [
	new TextNode(`
	Lorem Ipsum is simply dummy text of the printing and typesetting industry.
	Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
	when an unknown printer took a galley of type and scrambled it to make a type specimen book.
	It has survived not only five centuries, but also the leap into electronic typesetting,
	remaining essentially unchanged.`)
];

const headerValue = [new TextNode('A Lunchbox Header Worth Reading')];

storiesOf('4. Components|Post Promotion/Lunchbox', module)
	.addDecorator(withDocs(README))
	.add('Read Only - text', () => {
		const renderLink = boolean('show button', true);
		const alignment = select('Text Alignment', ['Center', 'Left'], 'Center');
		return (
			<Lunchbox
				header={
					new Header({
						level: 2,
						alignment: 'Center',
						value: headerValue
					})
				}
				paragraph={new LunchboxParagraph(
					{ paragraph: new Paragraph(textNodes), alignment }
				)}
				backgroundColor={color('Background Color', 'white')}
				layout={LunchboxModel.Layouts.Text.HeaderParagraph}
				button={renderLink && new LinkNode([new TextNode(text('button text', 'click me'))], text('button url', 'https://www.kinja.com'))}
			/>
		);
	})
	.add('Read Only - image', () => {
		const renderLink = boolean('show button', true);
		return (
			<Lunchbox
				image={
					new ImageNode({
						id: 'tscqkiavefq37idpvl5g',
						format: 'png',
						width: number('image width', 1920),
						height: 1080,
						alignment: select('image alignment', ['Bleed', 'FullWidth'], 'Bleed'),
						caption: [],
						syndicationRights: false,
						attribution: []
					})
				}
				layout={select(
					'layout',
					[LunchboxModel.Layouts.Image.Inline, LunchboxModel.Layouts.Image.Bleed, LunchboxModel.Layouts.Image.Parallax],
					LunchboxModel.Layouts.Image.Inline
				)}
				button={renderLink && new LinkNode([new TextNode(text('button text', 'click me'))], text('button url', 'https://www.kinja.com'))}
			/>
		);
	})
	.add('Read Only - text and image layouts', () => {
		const alignment = select('Text Alignment', ['Center', 'Left'], 'Center');
		const renderLink = boolean('show button', true);
		return (
			<Lunchbox
				image={
					new ImageNode({
						id: 'tscqkiavefq37idpvl5g',
						format: 'png',
						width: 1920,
						height: 1080,
						alignment: 'Bleed',
						caption: [],
						syndicationRights: false,
						attribution: []
					})
				}
				header={
					new Header({
						level: 2,
						alignment: 'Center',
						value: headerValue
					})
				}
				paragraph={new LunchboxParagraph(
					{ paragraph: new Paragraph(textNodes), alignment }
				)}
				backgroundColor={color('Background Color', 'white')}
				layout={select(
					'Layout',
					[
						LunchboxModel.Layouts.ImageText.HeaderParagraph.Left,
						LunchboxModel.Layouts.ImageText.HeaderParagraph.Right,
						LunchboxModel.Layouts.Hero.HeaderParagraph.ImageFirst,
						LunchboxModel.Layouts.Hero.HeaderParagraph.TextFirst
					],
					LunchboxModel.Layouts.ImageText.HeaderParagraph.Left
				)}
				button={renderLink && new LinkNode([new TextNode(text('button text', 'click me'))], text('button url', 'https://www.kinja.com'))}
			/>
		);
	})
	.add('Editor', () => {
		const renderLink = boolean('show button', true);
		return (
			<div style={{ width: '100%' }}>
				<WithState
					initialState={{
						backgroundColor: '#fff',
						headerText: '',
						paragraphText: '',
						currentLayout: LunchboxModel.Layouts.ImageText.HeaderParagraph.Left,
						textAlignment: 'Left'
					}}
				>
					{({ backgroundColor, headerText, paragraphText, currentLayout, textAlignment }, setState) => (
						<WithFloatingToolbar
							onClick={() => {}}
							toolbarItems={SpecialSectionStreamToolbarConfig({
								customContent: [],
								addBackgroundColor: (moduleId, { backgroundColor }) => setState({ backgroundColor }),
								moveModule: () => {},
								deleteModule: () => {},
								currentModuleId: '',
								addLinkToModule: () => {},
								textAlignment,
								updateTextAlignment: (moduleId, { textAlignment }) => setState({ textAlignment })
							})}
							showToolbar
						>
							<LunchboxEditor
								showToolbar
								id={String(Date.now())}
								backgroundColor={backgroundColor}
								currentLayout={currentLayout}
								handleUpdateHeader={setState}
								handleUpdateLayout={setState}
								handleUpdateParagraph={setState}
								handleMediaUpload={action('handle media upload')}
								headerText={headerText}
								deleteImage={setState}
								paragraphText={paragraphText}
								textAlignment={textAlignment}
								button={
									renderLink && new LinkNode([new TextNode(text('button text', 'click me'))], text('button url', 'https://www.kinja.com'))
								}
							/>
						</WithFloatingToolbar>
					)}
				</WithState>
			</div>
		);
	});
