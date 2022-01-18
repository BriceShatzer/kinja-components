import * as React from 'react';
import { shallow } from 'enzyme';

import { VideoListItem } from './video-list-item';
import videos from './__fixtures__/videos';

const noop = () => { };

const mockVideo = videos[0];

const stubElement = ({
	video = mockVideo,
	onClick = noop,
	type = 'carousel',
	clickOutToVideos = false,
	index = 0,
	total = 1,
	ga = noop
} = {}) => (
	<VideoListItem
		video={video}
		clickHandler={onClick}
		type={type}
		clickOutToVideos={clickOutToVideos}
		index={index}
		total={total}
		ga={ga}
	/>
);

describe('<VideoListItem />', () => {
	it('should render by default', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should call the onVideoClick prop when clicked', () => {
		const onClick = jest.fn();
		const wrapper = shallow(stubElement({
			onClick
		}));

		wrapper.find('Item').first().simulate('click');
		expect(onClick).toHaveBeenCalledWith(mockVideo.id);
	});

	it('should not call the onVideoClick prop when clicked, if element is clickOutToVideos', () => {
		const onClick = jest.fn();
		const wrapper = shallow(stubElement({
			onClick,
			clickOutToVideos: true
		}));

		wrapper.find('Item').first().simulate('click');
		expect(onClick).not.toHaveBeenCalled();
	});

	it('should have link href if it\'s clickOutToVideos', () => {
		const onClick = jest.fn();
		const wrapper = shallow(stubElement({
			onClick,
			clickOutToVideos: true
		}));

		const href = wrapper.find('Item').first().prop('href');
		expect(href).toMatchSnapshot();
	});
});
