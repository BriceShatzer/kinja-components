import * as React from 'react';
import { shallow } from 'enzyme';
import { ResponsiveImage, calcSrcSet } from './image';
import ImageSizes from 'kinja-images/config/image-sizes';

const MOCKED_IMAGE = {
	id: 'test_image_id',
	format: 'jpg',
	width: 800,
	height: 443,
	alignment: 'Center',
	caption: [],
	attribution: [],
	altText: undefined,
	relative: true,
	alt: 'yo, this is alt'
};

describe('Image elements', () => {
	it('should render a responsive image', () => {
		const wrapper = shallow(
			<ResponsiveImage
				noLazy
				id={MOCKED_IMAGE.id}
				width={MOCKED_IMAGE.width}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	describe('srcSet calc', () => {
		test('should return array of empty strings when image width is too small', () => {
			const srcSet = calcSrcSet(ImageSizes, ['KinjaCenteredMediumAuto', 'KinjaCenteredLargeAuto',
				'CenteredWideExtraBigAuto', 'CenteredWideSuperLarge', 'AvatarSmallAuto'],
			'test_image_id', true, 'jpg', 60);

			expect(srcSet).toEqual([]);
		});

		test('should return a correct SrcSet for a post width image', () => {
			const srcSetMock =
				['https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_180,q_80,w_320/test_image_id.jpg 320w',
					'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_264,q_80,w_470/test_image_id.jpg 470w',
					'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_80,q_80,w_80/test_image_id.jpg 80w'];
			const srcSet = calcSrcSet(ImageSizes, ['KinjaCenteredMediumAuto', 'KinjaCenteredLargeAuto',
				'CenteredWideExtraBigAuto', 'CenteredWideSuperLarge', 'AvatarSmallAuto'],
			'test_image_id', true, 'jpg', 636);

			expect(srcSet).toEqual(srcSetMock);
		});
	});

	describe('data attributes are present', () => {
		let image;

		beforeAll(() => {
			image = shallow(<ResponsiveImage {...MOCKED_IMAGE} />).find('img');
		});

		test('data-srcset', () => {
			expect(image.prop('data-srcset')).toMatchSnapshot();
		});

		describe('when animated', () => {
			let image;
			const props = Object.assign({}, MOCKED_IMAGE, { format: 'gif' });

			beforeAll(() => {
				image = shallow(<ResponsiveImage {...props} />).find('video');
			});


			test('data-postersrc should be the default transform as jpg', () => {
				expect(image.prop('data-postersrc'))
					.toEqual(
						expect.stringContaining('test_image_id.jpg')
					);
			});

			test('data-webmsrc', () => {
				expect(image.prop('data-webmsrc'))
					.toEqual(
						expect.stringContaining('test_image_id.webm')
					);
			});

			test('data-mp4src', () => {
				expect(image.prop('data-mp4src'))
					.toEqual(
						expect.stringContaining('test_image_id.mp4')
					);
			});
		});
	});
});
