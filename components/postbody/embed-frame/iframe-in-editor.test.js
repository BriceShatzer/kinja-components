import * as React from 'react';
import IframeInEditor from './iframe-in-editor';
import { mount } from 'enzyme';
import Iframe from 'postbody/blockNodes/Iframe';
import Dimension from 'postbody/Dimension';

const dimensions = {
	width: new Dimension(800, 'Pixel'),
	height: new Dimension(450, 'Pixel')
};

describe('<Iframe /> in editor', () => {
	it('should render flex-video iframe', () => {
		const iframe = new Iframe({
			...dimensions,
			source: 'https://example.com',
			aspectRatio: 'Flex',
			scrollable: false
		});
		const wrapper = mount(<IframeInEditor node={iframe} toolbarEnabled />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render flex-video iframe, insecure domain', () => {
		const iframe = new Iframe({
			...dimensions,
			source: 'http://example.com',
			aspectRatio: 'Flex',
			scrollable: false
		});
		const wrapper = mount(<IframeInEditor node={iframe} toolbarEnabled />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render flex-video iframe with thumbnail', () => {
		const iframe = new Iframe({
			...dimensions,
			source: 'https://example.com',
			aspectRatio: 'Flex',
			scrollable: false,
			thumbnail: {
				id: 'image_id',
				format: 'jpg'
			}
		});
		const wrapper = mount(<IframeInEditor node={iframe} toolbarEnabled />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render fixed aspect-ratio iframe', () => {
		const iframe = new Iframe({
			...dimensions,
			source: 'https://example.com',
			aspectRatio: 'Fixed',
			scrollable: false
		});
		const wrapper = mount(<IframeInEditor node={iframe} toolbarEnabled />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render custom dimensions iframe', () => {
		const iframe = new Iframe({
			...dimensions,
			source: 'https://example.com',
			aspectRatio: 'Custom',
			scrollable: false
		});
		const wrapper = mount(<IframeInEditor node={iframe} toolbarEnabled />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render custom dimensions iframe, scrollable', () => {
		const iframe = new Iframe({
			...dimensions,
			source: 'https://example.com',
			aspectRatio: 'Custom',
			scrollable: true
		});
		const wrapper = mount(<IframeInEditor node={iframe} toolbarEnabled />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
	it('should render custom dimensions iframe, percentage width', () => {
		const iframe = new Iframe({
			...dimensions,
			width: new Dimension(100, 'Percent'),
			source: 'https://example.com',
			aspectRatio: 'Custom',
			scrollable: true
		});
		const wrapper = mount(<IframeInEditor node={iframe} toolbarEnabled />);
		expect(wrapper.getDOMNode()).toMatchSnapshot();
	});
});