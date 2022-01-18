// @flow

import * as React from 'react';
import styled from 'styled-components';
import {
	storiesOf,
	action
} from 'base-storybook';

import VideoPlayer from './video-player';

// $FlowFixMe
import 'video.js/dist/video-js.css';
// $FlowFixMe
import 'videojs-ima/dist/videojs.ima.css';

const Wrapper = styled.div`
	position: relative;
	padding-bottom: 56.25%;
`;

const videoJsOptions = {
	autoplay: false,
	controls: true,
	aspectRatio: '16:9',
	poster: 'https://blog.urbansurfer.co.uk/wp-content/uploads/2017/09/kids-skateboarders.jpg',
	sources: [
		{
			src: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
			type: 'application/x-mpegURL'
		}
	],
	onLoad: action('Video player loaded')
};

storiesOf('3. Elements|Custom Video', module)
	.add('Player', () => {
		return (
			<Wrapper>
				<VideoPlayer {...videoJsOptions}/>
			</Wrapper>
		);
	})
	.add('Player autoplaying', () => {
		return (
			<Wrapper>
				<VideoPlayer {...videoJsOptions} autoplay={true} unmuteAfterPreroll={true} />
			</Wrapper>
		);
	})
	.add('Player autoplaying muted', () => {
		return (
			<Wrapper>
				<VideoPlayer {...videoJsOptions} autoplay={true} />
			</Wrapper>
		);
	})
	.add('Player with pre-roll', () => {
		const adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&' +
			'env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=';
		return (
			<Wrapper>
				<VideoPlayer {...videoJsOptions} adTagUrl={ adTagUrl } />
			</Wrapper>
		);
	})
	.add('Player with captions', () => {
		// https://kinja.com/api/videoupload/video/111002
		const options = {
			...videoJsOptions,
			captions: [{
				id: '11793',
				language: 'en',
				label: 'en',
				format: 'vtt',
				url: 'https://kinja.com/api/videoupload/caption/11793.vtt'
			}],
			// overrides
			poster: 'https://assets-jpcust.jwpsrv.com/thumbnails/w41xet41-720.jpg',
			sources: [{
				src: 'https://kinja-vh.akamaihd.net/i/prod/111002/111002_,180p,270p,.mp4.csmil/master.m3u8',
				type: 'application/x-mpegURL'
			}]
		};
		return (
			<Wrapper>
				<VideoPlayer {...options} />
			</Wrapper>
		);
	});
