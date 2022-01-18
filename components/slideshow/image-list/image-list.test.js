/* eslint no-unused-expressions: 0 */

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import ImageList, { SortableGrid } from './image-list';

const sampleItem1 = { image: { url: 'test1' } };
const sampleItem2 = { image: { url: 'test2' } };
const sampleItems = [sampleItem1, sampleItem2];
const noop = () => {};

const stubElement = ({
	items = sampleItems,
	onChange = noop,
	aspectRatio = 'Photo'
} = {}) => (
	<ImageList
		items={items}
		onChange={onChange}
		aspectRatio={aspectRatio}
	/>
);

describe('Slideshow <ImageList />', () => {
	it('should display all items', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});
	it('should call onChange when the sorting changes', () => {
		const handler = jest.fn();
		const wrapper = shallow(stubElement({
			onChange: handler
		}));
		wrapper.find(SortableGrid).simulate('sortEnd', { oldIndex: 1, newIndex: 0 });
		const newArray = [sampleItem2, sampleItem1];
		expect(handler).toHaveBeenCalledWith(newArray);
	});
	it('should call onChange when deleting an item', () => {
		const handler = jest.fn();
		const wrapper = shallow(stubElement({
			onChange: handler
		}));
		wrapper.find(SortableGrid).prop('items')[0].onDelete();
		expect(handler).toHaveBeenCalledWith([sampleItem2]);
	});
});
