import * as React from 'react';
import { shallow } from 'enzyme';

import { RecentVideo } from './recent-video';

import mockVideos from './__fixtures__/videos';

const stubElement = ({
	blogGroup = 'avclub',
	blogName = 'The A.V. Club',
	hostName = 'avclub.com',
	carouselEnabled = false,
	videos = mockVideos.slice(0, 1),
	position = 'frontpage'
} = {}) => (
	<RecentVideo
		blogGroup={blogGroup}
		blogName={blogName}
		hostName={hostName}
		carouselEnabled={carouselEnabled}
		videos={videos}
		position={position}
	/>
);

describe('<RecentVideo />', () => {
	it('should render on the frontpage', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should render on permalinks', () => {
		const wrapper = shallow(stubElement({
			position: 'permalink'
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should not render without without videos', () => {
		const wrapper = shallow(stubElement({
			videos: []
		}));

		expect(wrapper.html()).toBe(null);
	});

	it('should render with multiple videos', () => {
		const wrapper = shallow(stubElement({
			videos: mockVideos
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should render carousel with multiple videos', () => {
		const wrapper = shallow(stubElement({
			videos: mockVideos,
			carouselEnabled: true
		}));
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Carousel').exists()).toBe(true);
	});

	it('should not render with carousel with one video', () => {
		const wrapper = shallow(stubElement({
			carouselEnabled: true
		}));
		expect(wrapper).toMatchSnapshot();
		expect(wrapper.find('Carousel').exists()).toBe(false);
	});
});
