/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import VideoPlaylist from './video-playlist';

jest.mock('./utils');

describe('<VideoPlaylist />', () => {
	const timestamp = 1512136800667;

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => timestamp);
	});

	it('should render by default', () => {
		const wrapper = shallow(<VideoPlaylist
			id={'1'}
			playlistName={'Evergreen vids'}
			length={3750000}
			videoCount={8}
			lastUpdated={'2019-11-20T11:08:34.951-05:00'}
			oldestVideo={'2019-11-20T11:08:34.951-05:00'}/>);
		expect(wrapper).toMatchSnapshot();
	});
});
