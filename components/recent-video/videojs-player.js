/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import Endscreen from './endscreen';
import OnScreen from '../hoc/on-screen';
import { VideoPlayer, autoplay, videoAnalytics } from '../video-player';
import imageUrl from 'kinja-images/imageUrl';

import type videojs from 'video.js';
import type { Video } from 'module/video/videoRequest';
import type { OnScreenInjectedProps } from '../hoc/on-screen';
import type { Experiments } from '../video-player';

type Props = {
	blogName: string,
	nowPlayingIndex: number,
	videos: Array<Video>,
	playVideo: (id?: string) => void,
	playNextVideo: () => void,
	videoPageUrl: string,
	isAutoplay: boolean,
	isReplay: boolean,
	clickOutToVideos?: boolean,
	inSidebar: boolean,
	experiments: Experiments,
	contentType: string,
	pauseCountdown?: boolean,
	debugMode?: boolean
} & OnScreenInjectedProps;

type State = {
	showEndscreen: boolean
}

const Container = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 56.25%;
	max-height: 100%;
	max-width: 100%;
	position: relative;
	background: black;
`;

class VideoJSPlayer extends React.Component<Props, State> {
	playerInstance: videojs;
	userPaused: boolean;
	firstPlay = true;

	state = {
		showEndscreen: false
	}

	onVideoPlayerLoad = playerInstance => {
		this.playerInstance = playerInstance;
		this.userPaused = false;

		const nowPlaying = this.props.videos[this.props.nowPlayingIndex];
		const { contentType, experiments } = this.props;
		const posterData = nowPlaying.poster || nowPlaying.thumbnail;
		const poster = imageUrl(posterData.id, 'KinjaUncroppedLargeAuto');
		const media = {
			src: nowPlaying.streamingUrl,
			type: 'application/x-mpegURL',
			network: nowPlaying.network,
			title: nowPlaying.postInfo && nowPlaying.postInfo.headline,
			id: nowPlaying.id,
			poster,
			playingIndex: this.props.nowPlayingIndex,
			autoplay: this.props.isAutoplay
		};

		videoAnalytics(playerInstance, {
			contentType,
			position: 'outstream',
			siteSection: window.kinja.meta.blog.displayName,
			website: window.kinja.meta.blog.blogGroup,
			experiments
		});

		playerInstance.on('ended', () => {
			if (!playerInstance.isFullscreen()) {
				playerInstance.pause();
				this.setState({ showEndscreen: true });
			}
		});

		// Only the "endscreen" can pause the video without user interaction,
		// so when there's a "pause" event on the video player, we simply check
		// if the endscreen is on to determine if this was a user initiated pause.
		playerInstance.on('pause', () => {
			this.userPaused = !this.state.showEndscreen;
		});
		// Play events will obviously clear the userPaused and firstPlay flags
		playerInstance.on('play', () => {
			this.userPaused = false;
			this.firstPlay = false;
		});

		playerInstance.loadMedia(media);
		this.triggerVideoMetaEvent(media);

		if (this.props.isVisible && this.props.isAutoplay) {
			autoplay(playerInstance);
		}

		if (playerInstance.hlsQualitySelector) {
			playerInstance.hlsQualitySelector();
		}
	}

	componentWillReceiveProps(nextProps: Props) {
		if (this.props.nowPlayingIndex !== nextProps.nowPlayingIndex || nextProps.isReplay) {
			this.setState({ showEndscreen: false });
		}
	}

	componentDidUpdate(prevProps: Props) {
		if (this.props.isVisible !== prevProps.isVisible) {
			this.onVisibilityChange();
		} else if (!this.state.showEndscreen) {
			this.playCurrentVideo();
		}
	}

	playCurrentVideo() {
		const nowPlaying = this.props.videos[this.props.nowPlayingIndex];
		const media = {
			src: nowPlaying.streamingUrl,
			type: 'application/x-mpegURL',
			network: nowPlaying.network,
			title: nowPlaying.postInfo.headline,
			id: nowPlaying.id,
			playingIndex: this.props.nowPlayingIndex,
			autoplay: this.props.isAutoplay
		};

		this.playerInstance && this.playerInstance.loadMedia(media, () => {
			this.triggerVideoMetaEvent(media);
			// Fetch new ads based on the adschedule
			// - change the ad tag
			// - request the damn ad
			// The `setContentWithAdTag` method on the IMA plugin seemed so promising,
			// but it did not work :shrug: Maybe we can figure it out later?
			if (this.playerInstance.ima && this.playerInstance.ima.changeAdTag) {
				this.playerInstance.ima.changeAdTag(nowPlaying.adschedule);
				this.playerInstance.ima.requestAds();
			}
			// start playing the video \o/
			autoplay(this.playerInstance);
		});
	}

	triggerVideoMetaEvent = media => {
		this.playerInstance.trigger('loadedmanualmeta', media);
	}

	onVisibilityChange() {
		if (this.playerInstance) {
			const { isVisible, isAutoplay } = this.props;
			const paused = this.playerInstance.paused();

			// On first play, only start playback if the player is set to autoplay
			const canPlay = this.firstPlay ? isAutoplay : true;

			if (isVisible && paused && !this.playerInstance.ended() && !this.userPaused && canPlay) {
				autoplay(this.playerInstance);
			}
		}
	}

	render() {
		const nowPlaying = this.props.videos[this.props.nowPlayingIndex];
		const posterData = nowPlaying.poster || nowPlaying.thumbnail;
		const poster = posterData ? imageUrl(posterData.id, 'KinjaUncroppedLargeAuto') : '';
		const videoPlayerProps = {
			autoplay: false, // autoplay is handled by onVisibilityChange()
			playsInline: true,
			muted: true,
			preload: 'auto',
			controls: true,
			poster,
			sources: [],
			onLoad: this.onVideoPlayerLoad,
			aspectRatio: '16:9',
			adTagUrl: nowPlaying.adschedule,
			captions: nowPlaying.captions,
			debugMode: this.props.debugMode
		};
		return (
			<Container className="js_video-wrapper" id={nowPlaying.id} data-caption={JSON.stringify(nowPlaying.captions)}>
				<VideoPlayer {...videoPlayerProps} />
				{this.state.showEndscreen &&
					<Endscreen
						{...this.props}
						isVisible={this.props.isVisible || !this.props.pauseCountdown}
					/>
				}
			</Container>
		);
	}
}

export default OnScreen(VideoJSPlayer, { partialVisibility: true });
