import React from 'react';
import { mount } from 'enzyme';

import Blog from 'kinja-magma/models/Blog';
import SidebarPost from 'kinja-magma/models/SidebarPost';

import TrendingItem from './trending-item';

import gizmodoJSON from '../../../__stubs__/gizmodo.json';
import sidebarPosts from '../__fixtures__/sidebar-posts';

const postJSON = sidebarPosts[0];
const timestamp = 1512136800667;
const publishTimeFake = {
	publishTimeMillis: timestamp,
	publishTime: {
		timestamp: 1517355780336,
		timezone: 'America/Chicago',
		locale: 'en-US'
	}
};
const mockDate = timestamp =>
	jest.spyOn(Date, 'now').mockImplementation(() => timestamp);


describe('TrendingItem', () => {
	mockDate(timestamp);

	it('should render', () => {
		const wrapper = mount(
			<TrendingItem
				post={SidebarPost.fromJSON({
					...postJSON,
					...publishTimeFake
				})}
				currentBlog={Blog.fromJSON(gizmodoJSON)}
				active
				index={0}
				count={3}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should hide author name if blog is not displaying author names', () => {
		const wrapper = mount(
			<TrendingItem
				post={SidebarPost.fromJSON({
					...postJSON,
					...publishTimeFake
				})}
				currentBlog={Blog.fromJSON({
					...gizmodoJSON,
					hideAuthorInfo: true
				})}
				active
				index={0}
				count={3}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
