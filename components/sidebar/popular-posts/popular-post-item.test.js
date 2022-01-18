import * as React from 'react';

import Blog from 'kinja-magma/models/Blog';
import SidebarPost from 'kinja-magma/models/SidebarPost';

import PopularPostItem from './popular-post-item';
import { shallow, mount } from 'enzyme';

import posts from '../__fixtures__/sidebar-posts';
import gizmodoJSON from '../../../__stubs__/gizmodo.json';

const blog = Blog.fromJSON(gizmodoJSON);

describe('<PopularPosts /> - PopularPostItem', () => {
	it('should render by default', () => {
		const gaEvent = jest.fn();
		const result = shallow(
			<PopularPostItem
				post={SidebarPost.fromJSON(posts[0])}
				currentBlog={blog}
				index={0}
				gaEvent={gaEvent}
			/>
		);
		expect(result).toMatchSnapshot();
	});
	it('should call ga event handler', () => {
		const gaEvent = jest.fn();
		const result = mount(
			<PopularPostItem
				post={SidebarPost.fromJSON(posts[0])}
				currentBlog={blog}
				index={0}
				gaEvent={gaEvent}
			/>
		);
		result.find('popular-post-item__LinkContainer').simulate('click');
		expect(gaEvent).toHaveBeenCalledWith(posts[0].permalink, 0);
	});
	it('should render without image', () => {
		const gaEvent = jest.fn();
		const result = shallow(
			<PopularPostItem
				post={SidebarPost.fromJSON({
					...posts[0],
					image: null
				})}
				currentBlog={blog}
				index={0}
				gaEvent={gaEvent}
			/>
		);
		expect(result).toMatchSnapshot();
	});
	it('should render without authorName', () => {
		const gaEvent = jest.fn();
		const result = shallow(
			<PopularPostItem
				post={SidebarPost.fromJSON({
					...posts[0],
					image: null,
					authorName: null
				})}
				currentBlog={blog}
				index={0}
				gaEvent={gaEvent}
			/>
		);
		expect(result).toMatchSnapshot();
	});
	it('should not show overlay when commentsDisabled, hideRecommendations and viewCount === 0', () => {
		const gaEvent = jest.fn();
		const result = shallow(
			<PopularPostItem
				post={SidebarPost.fromJSON({
					...posts[0],
					viewCount: 0
				})}
				currentBlog={blog}
				index={0}
				gaEvent={gaEvent}
				hideRecommendations
				commentsDisabled
			/>
		);
		expect(result).toMatchSnapshot();
	});

	it('should truncate headline to 130 characters', () => {
		const gaEvent = jest.fn();
		const result = shallow(
			<PopularPostItem
				post={SidebarPost.fromJSON({
					...posts[0],
					headline: `${posts[0].headline} This is a loooong headline, <i>believe me</i>. It just goes on and on and on.`
				})}
				currentBlog={blog}
				index={0}
				gaEvent={gaEvent}
			/>
		);
		expect(result.find('popular-post-item__Headline')).toMatchSnapshot();
	});
});
