/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import VideoPlaylistDetail from './video-playlist-detail';

jest.mock('./utils');

describe('<VideoPlaylistDetail />', () => {
	const timestamp = 1512136800667;

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => timestamp);
	});

	it('should render by default', () => {
		const wrapper = shallow(<VideoPlaylistDetail
			playlistName={'Evergreen vids'}
			length={7320}
			videoCount={8}
			lastUpdated={1572543000970}
			oldestVideo={1572526680195}
			onSaveClick={() => {}}
			onCancelClick={() => {}}
			onAddVideoClick={() => {}}
			onBackClick={() => {}}
			hasUnsavedChanges={false} />);
		expect(wrapper).toMatchSnapshot();
	});
});
