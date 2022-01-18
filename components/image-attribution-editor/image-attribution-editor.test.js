import * as React from 'react';
// import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import ImageAttributionEditor from './image-attribution-editor';
import { ImageAttributionEditor as ImageAttributionEditorNonHoc } from './image-attribution-editor';

const image = 'https://i.kinja-img.com/gawker-media/image/upload/s--RQQBbVuY--/c_fit,fl_progressive,q_80,w_636/w5tdejxht9bd9azy1tdl.jpg';
const attributionData = [{
	id: 0,
	type: 'photo',
	credit: 'Lacey Terrell',
	source: 'HBO',
	label: 'WhoDat'
}, {
	id: 1,
	type: 'photo',
	credit: 'Carole Segal',
	source: 'NBC/NBCU',
	label: 'FuManchu'
}, {
	id: 2,
	type: 'photo',
	credit: 'Hulton Deutsch',
	source: 'Getty'
}, {
	id: 3,
	type: 'graphic',
	credit: 'Emi Talibas'
}, {
	id: 4,
	type: 'screenshot',
	credit: 'Gizmodo Labs'
}];

describe('<ImageAttributionEditor />', () => {
	it('renders an <ImageAttributionEditor /> with no attribution or caption', () => {
		const wrapper = mount(
			<ImageAttributionEditor attribution={[]} caption='' image={image} exportInlineNodes={f => f} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('renders an <ImageAttributionEditor /> with attribution and caption', () => {
		const wrapper = mount(
			<ImageAttributionEditor attribution={attributionData} caption='My Caption' image={image} exportInlineNodes={f => f} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it('getAttributionNodes should return correct output', () => {
		const wrapper = mount(
			<ImageAttributionEditorNonHoc attribution={attributionData} caption='My Caption' image={image} exportInlineNodes={f => f} />
		);
		const output = wrapper.instance().getAttributionNodes(attributionData);
		expect(output).toMatchSnapshot();
	});
});
