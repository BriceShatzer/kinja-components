// @flow

import * as React from 'react';
import SlideshowInEditor from './in-editor';
import ImageNode from 'postbody/blockNodes/ImageNode';
import { TextNode } from 'postbody/InlineNode';
import { mount } from 'enzyme';

const image = (withCaption: boolean = false) => {
	return new ImageNode({
		id: 'id',
		width: 900,
		height: 600,
		format: 'jpg',
		alignment: 'Bleed',
		caption: withCaption ? [new TextNode('caption')] : []
	});
};

describe('<SlideshowInEditor />', () => {
	it('should render by default', () => {
		const wrapper = mount(<SlideshowInEditor slides={[image(true)]} aspectRatio="Wide" />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render empty slideshow', () => {
		const wrapper = mount(<SlideshowInEditor slides={[]} aspectRatio="Wide" />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render without caption or attribution', () => {
		const wrapper = mount(<SlideshowInEditor slides={[image(false)]} aspectRatio="Wide" />);
		expect(wrapper).toMatchSnapshot();
	});

});
