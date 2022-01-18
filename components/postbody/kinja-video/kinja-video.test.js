import * as React from 'react';
import KinjaVideo from './kinja-video';
import { VideoPlayer } from '../../video-player';
import { shallow } from 'enzyme';

const props = {
	videoMeta: {
		streamingUrl: 'https://testurl.com/playlist.m3u8',
		poster: {
			id: '1234abcd',
			format: 'jpg'
		}
	}
};

describe('<KinjaVideo />', () => {
	it('should render a VideoPlayer element', () => {
		const result = shallow(<KinjaVideo {...props} />);
		expect(result.find(VideoPlayer).length).toBe(1);
		expect(result).toMatchSnapshot();
	});
});
