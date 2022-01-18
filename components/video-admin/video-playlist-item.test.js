/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import SimpleImage from 'kinja-magma/models/SimpleImage';

import VideoPlaylistItem from './video-playlist-item';

describe('<VideoPlaylistItem />', () => {
	const timestamp = 1512136800667;

	const stubbedPoster1 = SimpleImage.fromJSON({
		id: 'igfq6s2z5hywc5yp3xrg',
		format: 'jpg'
	});

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => timestamp);
	});

	it('should render by default', () => {
		const wrapper = shallow(<VideoPlaylistItem
			index={0}
			count={2}
			videoId='1'
			poster={stubbedPoster1}
			title={'This Video Is Really Good'}
			uploadTime={'2019-10-31T13:30:00'}
			length={260}
			metaSource='Video'
			onRemoveClick={() => {}}
			onMoveItemClick={() => {}}
			onToggleMetaSourceClick={() => {}}
		/>);
		expect(wrapper).toMatchSnapshot();
	});
});
