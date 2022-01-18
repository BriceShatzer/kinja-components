/* eslint no-unused-expressions: 0 */

import * as React from 'react';
import { shallow } from 'enzyme';

import EditSlideshow from '../edit-slideshow';
import ButtonGroup from '../../button-group';
import Button from '../../buttons';
import ImageList from '../image-list';

const sampleItem1 = { image: { url: 'test1' } };
const sampleItem2 = { image: { url: 'test2' } };
const sampleItems = [sampleItem1, sampleItem2];
const noop = () => { };

const stubElement = ({
	items = sampleItems,
	onSubmit = noop,
	onCancel = noop,
	aspectRatio = 'Photo'
} = {}) => (
	<EditSlideshow
		items={items}
		onSubmit={onSubmit}
		onCancel={onCancel}
		aspectRatio={aspectRatio}
	/>
);

describe('<EditSlideshow />', () => {
	it('should render by default', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with wide aspect ratio', () => {
		const wrapper = shallow(stubElement({
			aspectRatio: 'Wide'
		}));
		expect(wrapper).toMatchSnapshot();
	});
	it('should fire cancel event when clicking the button', () => {
		const handler = jest.fn();
		const wrapper = shallow(stubElement({
			onCancel: handler
		}));
		wrapper.find(Button).findWhere(e => e.prop('label') === 'Cancel').simulate('click');
		expect(handler).toHaveBeenCalled();
	});
	it('should fire submit event when clicking the button', () => {
		const handler = jest.fn();
		const wrapper = shallow(stubElement({
			onSubmit: handler
		}));
		wrapper.find(Button).findWhere(e => e.prop('label') === 'Save slideshow').simulate('click');
		expect(handler).toHaveBeenCalledWith({
			items: sampleItems,
			aspectRatio: 'Photo'
		});
	});
	it('should change aspect ratio', () => {
		const handler = jest.fn();
		const wrapper = shallow(stubElement({
			onSubmit: handler
		}));
		wrapper.find(ButtonGroup).simulate('change', 'Wide');
		expect(wrapper).toMatchSnapshot();
		wrapper.find(Button).findWhere(e => e.prop('label') === 'Save slideshow').simulate('click');
		expect(handler).toHaveBeenCalledWith({
			items: sampleItems,
			aspectRatio: 'Wide'
		});
	});
	it('should change ordering', () => {
		const handler = jest.fn();
		const wrapper = shallow(stubElement({
			onSubmit: handler
		}));
		wrapper.find(ImageList).simulate('change', [sampleItem2, sampleItem1]);
		wrapper.find(Button).findWhere(e => e.prop('label') === 'Save slideshow').simulate('click');
		expect(handler).toHaveBeenCalledWith({
			items: [sampleItem2, sampleItem1],
			aspectRatio: 'Photo'
		});
	});
});
