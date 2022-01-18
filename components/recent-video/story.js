/* @flow */

import * as React from 'react';
import {
	storiesOf,
	select,
	boolean,
	number,
	withDocs,
	blogGroup
} from 'base-storybook';
import styled from 'styled-components';

import RecentVideo from './recent-video';
import defaultTheme from '../theme/themes';
import README from './README.md';
import getBlogGroupMeta from '../../../../public/javascripts/module/video/helpers/getBlogGroupMeta.es6';
import videos from './__fixtures__/videos';

window.kinja = {
	meta: {
		blog: {
			displayName: '',
			blogGroup: ''
		}
	}
};

storiesOf('4. Components|Recent Video', module)
	.addDecorator(withDocs(README))
	.add('RecentVideo', () => {
		const nrOfVideos = number('Number of videos', 5, { range: true, min: 0, max: 5, step: 1 });
		const videoType = select('Video Type', ['recent_videos', 'playlist'], 'recent_videos');
		const position = select('Position', ['frontpage', 'permalink'], 'frontpage');
		const carouselEnabled = boolean('Carousel', true);
		const clickOutToVideos = boolean('Click out to videos', false);
		const inSidebar = boolean('Appears in sidebar', false);

		const recentVideoProps = {
			videos: videos.slice(0, nrOfVideos).map(video => ({
				...video,
				adschedule: 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
				'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator='
			})),
			...getBlogGroupMeta(blogGroup()),
			position,
			carouselEnabled: carouselEnabled && position === 'frontpage',
			videoType,
			clickOutToVideos,
			inSidebar
		};

		const ContentWidthWrapper = styled.div`
			width: ${defaultTheme.mainContentMaxWidth};
		`;

		return (
			<ContentWidthWrapper>
				<RecentVideo {...recentVideoProps} />
			</ContentWidthWrapper>
		);
	});
