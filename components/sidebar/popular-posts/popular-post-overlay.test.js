import * as React from 'react';
import PopularPostOverlay from './popular-post-overlay';
import fixtures from '../__fixtures__/sidebar-posts';
import { shallow, mount } from 'enzyme';

const samplePost = {
	...fixtures[0],
	viewCount: 50
};


describe('<PopularPosts /> - Overlay', () => {
	it('displays a Popular Post\'s data', () => {
		const result = shallow(<PopularPostOverlay post={samplePost} />);
		expect(result).toMatchSnapshot();
	});
	it('doesn\'t display values that are 0', () => {
		const post = {
			...samplePost,
			viewCount: 0,
			likeCount: 0
		};
		const result = shallow(<PopularPostOverlay post={post} />);
		expect(result).toMatchSnapshot();
	});
	it('doesn\'t display anything when all values are missing', () => {
		const post = {
			...samplePost,
			viewCount: 0,
			likeCount: 0,
			replyCount: 0
		};
		const result = mount(<PopularPostOverlay post={post} />);
		expect(result.html()).toBe(null);
	});
	it('doesn\'t display anything when commentsDisabled, hideRecommendations and viewCount === 0', () => {
		const post = {
			...samplePost,
			viewCount: 0
		};
		const result = mount(<PopularPostOverlay post={post} commentsDisabled hideRecommendations />);
		expect(result.html()).toBe(null);
	});
	it('doesn\'t display likes with prop hideRecommendations', () => {
		const result = shallow(<PopularPostOverlay post={samplePost} hideRecommendations />);
		expect(result).toMatchSnapshot();
	});
	it('doesn\'t display replies with prop commentsDisabled', () => {
		const result = shallow(<PopularPostOverlay post={samplePost} commentsDisabled />);
		expect(result).toMatchSnapshot();
	});
});
