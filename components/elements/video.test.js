/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import Video from './video';

describe('Video elements', () => {
	it('should render a video', () => {
		const wrapper = shallow(
			<Video
				noLazy={true}
				id="id"
				posterFormat="jpg"
				posterTransform="CenteredWideExtraLarge"
				transform="CenteredWideExtraLarge"
			/>
		);

		expect(wrapper.find('LazyVideo').dive().find('video')).toMatchSnapshot();
	});

	it('should only include specific video options if prop is given', () => {
		const wrapper = shallow(
			<Video
				noLazy={true}
				id="id"
				posterFormat="jpg"
				posterTransform="CenteredWideExtraLarge"
				transform="CenteredWideExtraLarge"
				videoOptions={['muted']}
			/>
		);

		expect(wrapper.find('LazyVideo').dive().prop('autoplay')).toEqual(undefined);
		expect(wrapper.find('LazyVideo').dive().prop('muted')).toEqual(true);
	});

	it('should render placeholder if video isn\'t visible and lazy loading enabled', () => {
		const wrapper = shallow(
			<Video
				isVisible={false}
				id="id"
				posterFormat="jpg"
				posterTransform="CenteredWideExtraLarge"
				transform="CenteredWideExtraLarge"
			/>
		);

		expect(wrapper.find('LazyVideo').dive().find('video').length).toEqual(0);
		expect(wrapper.find('LazyVideo').dive().find('img')).toMatchSnapshot();
	});
});
