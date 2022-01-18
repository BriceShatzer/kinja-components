/* @flow */

import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import VideoListItem from './video-list-item';
import styled from 'styled-components';
import type { Video } from 'module/video/videoRequest';
import media from '../../style-utils/media';
import { Wrapper as VideoThumbnail } from 'kinja-components/components/video-thumbnail/video-thumbnail';
import { gridValue } from '../grid-utils';

type Props = {
	videos: Array<Video>,
	nowPlaying: ?Video,
	onVideoClick: (id: string) => void,
	clickOutToVideos?: boolean
};

const Container = styled(TransitionGroup) `
	overflow: hidden;
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	margin: 33px 0 0;

	> * {
		width: 100%;
	}

	> * + * {
		margin-left: 30px;
	}

	${media.smallOnly`
		flex-direction: column;
		margin-top: 20px;

		> * + * {
			margin-left: 0px;
		}

		${VideoThumbnail} {
			width: ${gridValue.small('2c')};
		}
	`}
`;

export const maxNumberOfVideos = 3;

const Carousel = (props: Props) => {
	const startingIndex = props.clickOutToVideos ? 1 : 0;
	const videos = props.videos.slice(startingIndex, startingIndex + maxNumberOfVideos);
	const nowPlayingId = props.nowPlaying ? props.nowPlaying.id : null;
	const total = videos.length;

	return (<Container>
		{videos.map((video, index) => (
			<VideoListItem
				key={video.id}
				video={video}
				clickHandler={props.onVideoClick}
				type="carousel"
				nowPlaying={video.id === nowPlayingId}
				clickOutToVideos={props.clickOutToVideos}
				index={index}
				total={total}
			/>
		))}
	</Container>);
};

export default Carousel;
