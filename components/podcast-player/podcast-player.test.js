import * as React from 'react';
import { shallow } from 'enzyme';

import PodcastPlayer from './podcast-player';

describe('<PodcastPlayer />', () => {
	test('should render podcastplayer', () => {
		const wrapper = shallow(<PodcastPlayer podcastId="PPY9140073942" />);

		expect(wrapper).toMatchSnapshot();
	});

	test('should not render anything when podcastId is null or empty', () => {
		const wrapper = shallow(<PodcastPlayer podcastId="" />);

		expect(wrapper.isEmptyRender()).toBe(true);
	});
});
