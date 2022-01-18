import * as React from 'react';
import { shallow } from 'enzyme';
import Slide from './slide';
import { TextNode } from 'postbody/InlineNode';

const SAMPLE_IMAGE = {
	id: 'something'
};

const stubElement = ({
	image = SAMPLE_IMAGE,
	load = true,
	aspectRatio = 'Photo',
	onLoad = () => {}
} = {}) => (
	<Slide
		image={image}
		aspectRatio={aspectRatio}
		load={load}
		onLoad={onLoad}
	/>
);

describe('Slideshow <Slide />', () => {
	it('should render with Photo aspect ratio by default', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with Wide aspect ratio if set', () => {
		expect(stubElement({
			aspectRatio: 'Wide'
		})).toMatchSnapshot();
	});
	it('should render differently after the image has loaded', () => {
		const wrapper = shallow(stubElement());
		wrapper.find('img').simulate('load');
		expect(wrapper).toMatchSnapshot();
	});
	it('should not be displaying the image if load is set to false', () => {
		expect(stubElement({
			load: false
		})).toMatchSnapshot();
	});
	it('should fire onLoad after the image has loaded', () => {
		const handler = jest.fn();
		const wrapper = shallow(stubElement({
			onLoad: handler
		}));
		wrapper.find('img').simulate('load');
		expect(handler).toHaveBeenCalled();
	});
	it('should render caption', () => {
		const wrapper = shallow(stubElement({
			image: {
				...SAMPLE_IMAGE,
				caption: [
					new TextNode('Sample caption')
				]
			}
		}));
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('img').prop('alt')).toBe('Sample caption');
	});
});
