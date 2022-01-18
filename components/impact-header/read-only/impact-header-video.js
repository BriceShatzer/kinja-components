/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import type KinjaVideo from 'postbody/blockNodes/KinjaVideo';
import aspectRatio from '../../../style-utils/aspectRatio';
import Video from '../../elements/video';
import imageUrl from 'kinja-images/imageUrl';
import { VideoPlayer } from '../../video-player';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

type LoopingVideoState = { loopingSourceUrl?: string };

class LoopingVideo extends React.Component<
	{
		video: KinjaVideo,
		getLoopingVideoSource?: (string) => Promise<?string>
	},
	LoopingVideoState
> {
	componentDidMount() {
		if (this.props.getLoopingVideoSource) {
			this.props.getLoopingVideoSource(this.props.video.id).then(loopingSourceUrl => {
				loopingSourceUrl && this.setState({ loopingSourceUrl });
			});
		}
	}

	render() {
		return (
			<Video
				videoOptions={['loop', 'autoPlay', 'muted', 'playsInline']}
				id={this.props.video.thumbnail.id}
				posterTransform={'UncroppedWideExtraLarge'}
				posterFormat={this.props.video.thumbnail.format}
				mp4Url={this.state && this.state.loopingSourceUrl}
				noLazy
			/>
		);
	}
}

const VideoPlaceholder = styled.div`
	background: black;
	position: relative;
	height: 100%;
	max-height: calc(100vh - 215px);
	max-width: 100%;
	overflow: hidden;
	width: 100%;
	z-index: 1;
	${() => aspectRatio(16, 9, 'div')};
`;

type StandardVideoState = { videoMeta?: VideoMeta };

class StandardVideo extends React.Component<
	{
		video: KinjaVideo,
		fetchVideoMetadata?: (videoId: string) => Promise<VideoMeta>
	},
	StandardVideoState
> {
	state = {};

	componentDidMount() {
		this.props.fetchVideoMetadata &&
			this.props.fetchVideoMetadata(this.props.video.id).then(videoMeta =>
				this.setState({ videoMeta }));
	}

	render() {
		return (
			<VideoPlaceholder>
				{(this.state.videoMeta &&
					this.state.videoMeta.poster &&
					this.state.videoMeta.streamingUrl) &&
					<VideoPlayer
						autoplay={false}
						muted={false}
						controls={true}
						captions={this.state.videoMeta.captions}
						poster={imageUrl(this.state.videoMeta.poster.id, 'KinjaUncroppedLargeAuto', this.state.videoMeta.poster.format)}
						sources={[{
							src: (this.state.videoMeta && this.state.videoMeta.streamingUrl) || '',
							type: 'application/x-mpegURL'
						}]}
						playsInline
					/>
				}
			</VideoPlaceholder>
		);
	}
}

type ImpactHeaderVideoProps = {
	fetchVideoMetadata?: (videoId: string) => Promise<VideoMeta>,
	getLoopingVideoSource?: (string) => Promise<?string>,
	featuredMedia: KinjaVideo
};

const ImpactHeaderVideoTarget = styled.div`
	.video-js {
		width: 100%;
		height: 100%;
	}

	video {
		height: 100%;
		width: 100%;
	}
`;

// TODO: unify this implementation with other Video components
export default function ImpactHeaderVideo(props: ImpactHeaderVideoProps) {
	const { featuredMedia, getLoopingVideoSource, fetchVideoMetadata } = props;
	return (
		<ImpactHeaderVideoTarget className="js_impact-header-video">
			{featuredMedia.isLooping ? (
				<LoopingVideo video={featuredMedia} getLoopingVideoSource={getLoopingVideoSource} />
			) : (
				<StandardVideo
					video={featuredMedia}
					fetchVideoMetadata={fetchVideoMetadata}
				/>
			)}
		</ImpactHeaderVideoTarget>
	);
}
