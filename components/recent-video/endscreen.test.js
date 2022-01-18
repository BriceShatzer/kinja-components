import * as React from 'react';
import { mount } from 'enzyme';
import Theme from '../theme';

import Endscreen from './endscreen';
import mockVideos from './__fixtures__/videos';

const noop = () => { };

const stubElement = ({
	blogName = 'The A.V. Club',
	playNextVideo = noop,
	playVideo = noop,
	videos = mockVideos,
	nowPlayingIndex = 0,
	videoPageUrl = 'https://www.avclub.com/video'
} = {}) => (
	<Theme blog='avclub'>
		<Endscreen
			blogName={blogName}
			playNextVideo={playNextVideo}
			playVideo={playVideo}
			videos={videos}
			nowPlayingIndex={nowPlayingIndex}
			videoPageUrl={videoPageUrl}
		/>
	</Theme>
);

describe('<Endscreen />', () => {
	it('should render by default', () => {
		const wrapper = mount(stubElement());

		expect(wrapper).toMatchSnapshot();
	});

	it('should start the next video when the play animation ends', () => {
		const playNextVideo = jest.fn();
		const wrapper = mount(stubElement({
			playNextVideo
		}));

		expect(playNextVideo).not.toBeCalled();

		wrapper.find('PlayButtonFill').simulate('animationEnd');
		expect(playNextVideo).toBeCalled();
	});

	it('should start the next video when the play button is clicked', () => {
		const playNextVideo = jest.fn();
		const wrapper = mount(stubElement({
			playNextVideo
		}));

		expect(playNextVideo).not.toBeCalled();

		wrapper.find('PlayButtonSVG').simulate('click');
		expect(playNextVideo).toBeCalled();
	});

	it('should show the endcards when the cancel button is clicked', () => {
		const wrapper = mount(stubElement());

		expect(wrapper.find('Endcards').exists()).toBe(false);

		wrapper.find('CancelButton').simulate('click');
		expect(wrapper.find('Endcards').exists()).toBe(true);
	});
});
