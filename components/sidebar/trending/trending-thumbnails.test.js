import React from 'react';
import { mount } from 'enzyme';

import TrendingThumbnails from './trending-thumbnails';

describe('TrendingThumbnails', () => {
	it('should render', () => {
		const wrapper = mount(
			<TrendingThumbnails
				posts={[{id: 0, image: { id: 0, format: 'jpg' }}]}
				onMouseEnter={() => {}}
				selectedItem={0}
				ga={() => {}}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should call OnMouseEnter on mouse enter', () => {
		const onMouseEnter = jest.fn();
		const wrapper = mount(
			<TrendingThumbnails
				posts={[{id: 0, image: { id: 0, format: 'jpg' }}]}
				onMouseEnter={onMouseEnter}
				selectedItem={0}
				ga={() => {}}
			/>
		);

		wrapper.find('trending-thumbnails__ReelItem').simulate('mouseEnter');

		expect(onMouseEnter).toHaveBeenCalledTimes(1);
	});
});
