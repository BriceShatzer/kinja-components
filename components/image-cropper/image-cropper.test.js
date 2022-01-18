import * as React from 'react';
import ReactImageCrop from 'react-image-crop';

import { shallow } from 'enzyme';

import ButtonGroup from '../button-group';
import ImageCropper from './image-cropper';

const IMAGE_SIZE = 2000;
const THRESHOLD_PERCENT = 50;

describe('Image Cropper', () => {
	let wrapper; // Our Image cropper component
	let plugin; // Third party component that does the actual cropping

	beforeEach(() => {
		wrapper = shallow(<ImageCropper
			src="foo.jpg"
			widthWarningThreshold={IMAGE_SIZE * (THRESHOLD_PERCENT / 100)}
			heightWarningThreshold={IMAGE_SIZE * (THRESHOLD_PERCENT / 100)}
		/>);
		plugin = wrapper.find(ReactImageCrop);
		// Simulate an image
		wrapper.setState({
			image: {
				naturalWidth: IMAGE_SIZE,
				naturalHeight: IMAGE_SIZE
			}
		});
	});

	it('renders the cropper itself', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('can select an area', () => {
		plugin.simulate('complete', {
			x: 20, y: 20,
			width: 50, height: 70
		});
		expect(wrapper).toMatchSnapshot();
	});

	it('shows a warning if the selected area is too small (both dimensions)', () => {
		plugin.simulate('complete', {
			x: 20,
			y: 20,
			width: THRESHOLD_PERCENT - 1,
			height: THRESHOLD_PERCENT - 1
		});
		expect(wrapper).toMatchSnapshot();
	});

	it('shows a warning if the selected area is too small (one dimension)', () => {
		plugin.simulate('complete', {
			x: 20,
			y: 20,
			width: THRESHOLD_PERCENT,
			height: THRESHOLD_PERCENT - 1
		});
		expect(wrapper).toMatchSnapshot();
	});

	it('can change aspect ratio', () => {
		wrapper.find('ButtonGroupItem').at(0).simulate('click');
		expect(wrapper).toMatchSnapshot();
	});

	it('should accept custom aspect ratios', () => {
		const aspectRatios = {
			'3:2': 3 / 2,
			'16:10': 16 / 10
		};
		wrapper = shallow(<ImageCropper aspectRatios={aspectRatios} src="foo.jpg" />);
		expect(wrapper).toMatchSnapshot();
		wrapper.find(ButtonGroup).simulate('change', '3:2');
		expect(wrapper).toMatchSnapshot();
	});

	it('doesn\'t let you crop below set amounts', () => {
		const MIN_AMOUNT = 200;
		wrapper.setProps({
			minWidth: MIN_AMOUNT,
			minHeight: MIN_AMOUNT
		});
		plugin = wrapper.find(ReactImageCrop);
		expect(wrapper).toMatchSnapshot();
	});
});
