import * as React from 'react';
import { shallow } from 'enzyme';

import { maxNumberOfVideos } from './carousel';
import Carousel from './carousel';

const mockVideo = {
	id: '174042',
	title: 'Sea Turtle Skillfully Finds Food',
	thumbnail: 'https://vmscdn-download.storage.googleapis.com/iupl/2A0/09B/2A009B77D2BE4F519E6C6C3C0C2F35CE',
	publishTime: '2018-03-29T20:20:00Z'
};

describe('<Carousel />', () => {
	it(`should have ${maxNumberOfVideos} number of videos maximum`, () => {
		const wrapper = shallow(<Carousel
			videos={Array(10).fill(mockVideo)}
		/>);

		expect(wrapper.find('Analytics(VideoListItem)')).toHaveLength(maxNumberOfVideos);
	});
});
