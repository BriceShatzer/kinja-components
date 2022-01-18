/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import Lunchbox from './lunchbox';
import { TextNode } from 'postbody/InlineNode';
import ImageNode from 'postbody/blockNodes/ImageNode';
import Header from 'postbody/blockNodes/Header';
import Paragraph from 'postbody/blockNodes/Paragraph';
import LunchboxModel from 'kinja-magma/models/Lunchbox';
import LunchboxParagraph from 'kinja-magma/models/LunchboxParagraph';
import LunchboxText from 'kinja-components/components/lunchbox/read-only/lunchbox-text';
import { LunchboxImage } from 'kinja-components/components/lunchbox/read-only';

describe('<Lunchbox />', () => {
	const textNodes = [new TextNode('My Dreams of Owning a'), new TextNode(' Phone Can Finally Be Fulfilled')];
	const imageNode = new ImageNode({
		id: 'tscqkiavefq37idpvl5g',
		format: 'png',
		width: 1920,
		height: 1080,
		alignment: 'Bleed',
		caption: [],
		syndicationRights: false,
		attribution: []
	});
	it('should render an array of text nodes', () => {
		const wrapper = shallow(
			<Lunchbox
				header={
					new Header({
						level: 2,
						alignment: 'Center',
						value: textNodes
					})
				}
				paragraph={new LunchboxParagraph(
					{ paragraph: new Paragraph(textNodes), alignment: 'Center' }
				)}
				layout={LunchboxModel.Layouts.Text.HeaderParagraph}
			/>
		);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(LunchboxText)).toHaveLength(1);
		expect(wrapper.find(LunchboxImage)).toHaveLength(0);
	});
	it('should render an inline image', () => {
		const wrapper = shallow(<Lunchbox image={imageNode} layout={LunchboxModel.Layouts.Image.Bleed} />);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(LunchboxText)).toHaveLength(0);
		expect(wrapper.find(LunchboxImage)).toHaveLength(1);
	});
	it('should render both text and image based on a layout prop', () => {
		const wrapper = shallow(
			<Lunchbox
				layout={LunchboxModel.Layouts.ImageText.HeaderParagraph.Left}
				header={
					new Header({
						level: 2,
						alignment: 'Center',
						value: textNodes
					})
				}
				paragraph={new LunchboxParagraph(
					{ paragraph: new Paragraph(textNodes), alignment: 'Center' }
				)}
				image={imageNode}
			/>
		);
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find(LunchboxText)).toHaveLength(1);
		expect(wrapper.find(LunchboxImage)).toHaveLength(1);
	});
});
