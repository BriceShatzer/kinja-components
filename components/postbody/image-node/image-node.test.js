import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { ImageNodeWrapper, ImageNodeComponent } from './image-node';
import { LazyResponsiveImage } from '../../elements/image';
import ImageNode from 'postbody/blockNodes/ImageNode';
import { TextNode } from 'postbody/InlineNode';

const MOCKED_IMAGE = {
	id: 'test_image_id',
	format: 'jpg',
	width: 800,
	height: 443,
	alignment: 'Center',
	caption: [],
	attribution: [],
	altText: undefined
};

const createImageNode = (imageProps = {}) =>
	new ImageNode(Object.assign({}, MOCKED_IMAGE, imageProps));

const MockedImageNodeComponent = (imageProps, componentProps = {}) => {
	const { lazyload, editable, postHeadline, isStarterPost } = componentProps;

	return (<ImageNodeComponent
		{...createImageNode(imageProps)}
		lazyload={lazyload || false}
		editable={editable}
		postHeadline={postHeadline}
		isStarterPost={isStarterPost}
		kinjaMeta={{}}
	/>);
};

const attribution = [{
	label: 'Photo',
	credit: [new TextNode('John Doe')],
	source: []
}];

const caption = [new TextNode('Kinja')];

describe('<ImageNode />', () => {

	it('should render a default image', () => {
		const image = mount(MockedImageNodeComponent());
		expect(image.getDOMNode()).toMatchSnapshot();
	});

	it('should render in the editor', () => {
		const image = mount(MockedImageNodeComponent({}, { editable: true }));
		expect(image.getDOMNode()).toMatchSnapshot();

	});

	// Alignment
	describe('align', () => {
		it('Left should have class align--left', () => {
			const image = shallow(MockedImageNodeComponent({ alignment: 'Left' }));
			expect(image.find(ImageNodeWrapper)).toHaveClassName('align--left');
		});
		it('Center should have class align--center', () => {
			const image = shallow(MockedImageNodeComponent({ alignment: 'Center' }));
			expect(image.find(ImageNodeWrapper)).toHaveClassName('align--center');
		});
		it('Right should have class align--right', () => {
			const image = shallow(MockedImageNodeComponent({ alignment: 'Right' }));
			expect(image.find(ImageNodeWrapper)).toHaveClassName('align--right');
		});
		it('Bleed should have class align--bleed', () => {
			const image = shallow(MockedImageNodeComponent({ alignment: 'Bleed' }));
			expect(image.find(ImageNodeWrapper)).toHaveClassName('align--bleed');
		});
		// Not used, we have a separate FullBleedComponent for it.
		it('FullWidth should have class align--fullwidth', () => {
			const image = shallow(MockedImageNodeComponent({ alignment: 'FullWidth' }));
			expect(image.find(ImageNodeWrapper)).toHaveClassName('align--fullwidth');
		});
	});

	describe('when lazyload prop is true', () => {
		test('the image is rendered with a placeholder src', () => {
			const image = shallow(MockedImageNodeComponent({}, { lazyload: true }));
			expect(image.find(LazyResponsiveImage).html()).toEqual(expect.stringContaining('data:image'));
		});
		test('the wrapper is rendered with a js_lazy-image class, used for hydration', () => {
			const image = shallow(MockedImageNodeComponent({}, { lazyload: true }));
			expect(image.find(ImageNodeWrapper)).toHaveClassName('js_lazy-image');
		});
	});

	describe('with caption', () => {
		test('should not exist by default', () => {
			const image = shallow(MockedImageNodeComponent({}));

			expect(image.find('ImageCaption').exists()).toBe(false);
		});

		test('should exists with correct props', () => {
			const image = shallow(MockedImageNodeComponent({
				caption
			}));

			expect(image.find('ImageCaption')).toMatchSnapshot();
		});

		test('should render the correct figcaption', () => {
			const image = mount(MockedImageNodeComponent({ caption }));
			expect(image.find('figcaption').getDOMNode()).toMatchSnapshot();
		});
	});

	describe('with image attribution', () => {
		test('should not exist by default', () => {
			const image = shallow(MockedImageNodeComponent({}));

			expect(image.find('ImageCaption').exists()).toBe(false);
		});

		test('should exists with correct props', () => {
			const image = shallow(MockedImageNodeComponent({
				attribution
			}));

			expect(image.find('ImageAttribution')).toMatchSnapshot();
		});

		test('should render the correct figcaption', () => {
			const image = mount(MockedImageNodeComponent({ attribution }));
			expect(image.find('figcaption').getDOMNode()).toMatchSnapshot();
		});

		test('should render the correct wrapper in the editor', () => {
			const image = mount(MockedImageNodeComponent({ attribution }, { editable: true }));
			expect(image.find('.popup-attribution').first().getDOMNode()).toMatchSnapshot();
		});
	});

	describe('alt text', () => {
		it('should display alt text if provided in the image node', () => {
			const image = mount(MockedImageNodeComponent(
				{ altText: 'Hello I am alt', caption }, { postHeadline: 'Hello I am headline', isStarterPost: true }));
			expect(image.find('img').prop('alt')).toBe('Hello I am alt');
		});
		it('should fall back to caption of altText is not available', () => {
			const image = mount(MockedImageNodeComponent(
				{ caption }, { postHeadline: 'Hello I am headline', isStarterPost: true }));
			expect(image.find('img').prop('alt')).toBe(caption[0].value);
		});
		it('should fall back to post title if nothing else is available', () => {
			const image = mount(MockedImageNodeComponent(
				{}, { postHeadline: '<i>Hello</i> I am headline', isStarterPost: true }));
			expect(image.find('img').prop('alt')).toBe('Illustration for article titled Hello I am headline');
		});
		it('should not fall back to article title on comment', () => {
			const image = mount(MockedImageNodeComponent(
				{}, { postHeadline: 'Hello I am headline', isStarterPost: false }));
			expect(image.find('img').prop('alt')).toBe('Illustration for comment');
		});
	});

});
