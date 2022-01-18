// @flow

import * as React from 'react';
// $FlowFixMe
import hlsQualitySelector from 'videojs-hls-quality-selector';
import createScriptTag from 'kinja-components/utils/createScriptTag';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';
import type Videojs from './videojs';
import type { Caption } from 'kinja-magma/api/video';
import OnScreenHOC from 'kinja-components/components/hoc/on-screen';
import { autoplay } from './autoplay';
import Logger from 'kinja-magma/utils/logger';

let logger;

// Hard-coded Play SVG icon because we want to use it as a background image in a responsive container;
// attempts to import it with raw-loader broke storybook


export const PlayIconSVG = `
	<div class="icon-wrapper">
		<svg class="icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" aria-label="PlayFilled icon" viewBox="0 0 18 18">
			<path fill="white" d="M5.3 16.7c-1.1.7-2.3 0-2.3-1.3V2.6c0-1.4 1.2-2 2.3-1.3l9.9 6.3c1 .7 1 2 0 2.7l-9.9 6.4z"/>
		</svg>
	</div>
`;

type VideoSource = {
	src: string,
	type: string
};

export type VideoPlayerProps = {|
	muted?: boolean,
	preload?: 'auto' | 'none',
	playsInline?: boolean,
	autoplay?: string | boolean,
	captions?: Array<Caption>,
	caption?: ?string,
	captionsEnabled?: boolean,
	controls?: boolean,
	width?: string,
	height?: string,
	poster: string,
	sources: Array<VideoSource>,
	adTagUrl?: ?string,
	adschedule?: ?string,
	fluid?: boolean,
	aspectRatio?: string,
	onLoad?: (playerInstance: Videojs) => void,
	isVisible?: boolean,
	playWhenInView?: boolean,
	debugMode?: boolean,
	unmuteAfterPreroll?: boolean,
	vpaidInsecureMode?: boolean
|};

type State = {
	playing?: string | boolean;
};

let version = '(unknown version)';

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100%;

	.video-js .vjs-big-play-button {
		display: none;
	}

	/* Stops caption menu from appearing on button hover, */
	/* making it only appear on click */
	.vjs-workinghover .vjs-subs-caps-button.vjs-menu-button-popup:hover {
		.vjs-menu {
			display: none;
		}
	}

	.video-js ul.vjs-menu-content {
		.vjs-menu-item {
			margin: 0;
			font-size: 0.7rem;
		}
		.vjs-menu-item-text {
			margin: 0;
			font-size: 0.7rem;
		}
	}

	video {
		width: 100%;
		height: 100%;
		cursor: pointer;
		outline: none;
	}

	.video-js {
		width: 100%;
		height: 100%;
	}
`;

const Inner = styled.div`
	.video-js {
		width: 100%;
		height: 100%;
	}
`;

export const PlayIconContainer = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;

	/* The container should not cover the control bar which is currently 30px tall at all sizes */
	bottom: ${({ withControlBar }) => withControlBar ? '30px' : '0'};

	cursor: pointer;

	.icon-wrapper {
		position: absolute;
		top: ${({ withControlBar }) => withControlBar ? 'calc(50% + 15px)' : '50%'};
		left: 50%;
		transform: translate(-50%, -50%);
		width: 15%;
		height: 0;
		padding-bottom: 15%;
		overflow: visible;
	}

	.icon {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 22;
	}

	.icon-wrapper::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle closest-side at center, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0) 100%);
		z-index: -1;
		overflow: visible;
	}

	&:hover .icon-wrapper::after {
		background: radial-gradient(circle closest-side at center, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0) 100%);
	}
`;

class VideoPlayer extends React.Component<VideoPlayerProps, State> {
	static get version() {
		return `VIDEOJS ${version}`;
	}

	player: Videojs;

	videoNode = React.createRef<HTMLVideoElement>();

	state: State = {
		playing: false
	};

	componentDidMount() {
		logger = new Logger('video-player', 'CLIENT_ERRORS_LOG', this.props.debugMode);

		import(/* webpackChunkName: "videojs" */ './videojs')
			.then(videojs => createScriptTag('//imasdk.googleapis.com/js/sdkloader/ima3.js')
				.then(() => this.initVideoPlayer(videojs, true))
				.catch(() => this.initVideoPlayer(videojs, false))
			);
	}

	initVideoPlayer = (videojs: Videojs, withAds: boolean) => {
		const videojsModule = typeof videojs.default === 'function' ? videojs.default : videojs;

		version = videojsModule.VERSION;

		const defaultOptions = {
			muted: true,
			controlBar: {
				pictureInPictureToggle: false
			},
			textTrackSettings: false
		};
		const options = {...defaultOptions, ...this.props};

		this.player = videojsModule(this.videoNode.current, options);

		if (this.player) {
			if (!this.player.hlsQualitySelector) {
				this.player.hlsQualitySelector = hlsQualitySelector;
			}

			this.player.hlsQualitySelector();
			withAds && this.props.adTagUrl &&
				this.player.ima({
					adTagUrl: this.props.adTagUrl,
					numRedirects: 5,
					prerollTimeout: 5000,
					vastLoadTimeout: 5000,
					debug: this.props.debugMode,
					disableCustomPlaybackForIOS10Plus: true,
					preventLateAdStart: true,
					vpaidMode: this.props.vpaidInsecureMode ? 2 : 1
				});

			this.player.on('play', () => {
				this.setState({ playing: true });
			});
			this.player.on('pause', () => this.setState({ playing: false }));
			this.player.on('loadedmetadata', () => {
				if (this.props.captions && this.props.captions.length > 0) {
					this.player.addRemoteTextTrack({
						src: this.props.captions[0].url,
						srclang: this.props.captions[0].language,
						label: 'captions on',
						kind: 'subtitles'
					}, false);
				}
			});
			this.player.on(['adserror', 'adscanceled', 'nopreroll', 'adtimeout'], e => {
				logger.error(e.type, {
					adTagUrl: this.props.adTagUrl
				});
			});
			this.player.on(['adserror', 'adscanceled', 'adend', 'adskip', 'nopreroll', 'adtimeout'], () => {
				if (this.player.paused()) {
					this.player.play();

					if (this.props.unmuteAfterPreroll) {
						// Manually unmute the player.
						// We always init the player in a state so we can play ads on iOS/Safari.
						// The next line is to make sure we have sound on the actual video once the preroll has ended.
						this.player.muted(false);
					}
				}
			});

			this.props.onLoad && this.props.onLoad(this.player);

			if (this.props.playWhenInView && this.props.isVisible) {
				autoplay(this.player);
			}
		} else {
			logger.error('Failed to initialize video.js player');
		}
	}

	pauseVideo = () => {
		if (this.state.playing) {
			this.player.pause();
			this.setState({ playing: false });
		}
	}

	componentDidUpdate(prevProps: VideoPlayerProps) {
		if (this.props.playWhenInView && !prevProps.isVisible && this.props.isVisible && this.player) {
			autoplay(this.player);
		}
	}

	// destroy player on unmount
	componentWillUnmount() {
		if (this.player) {
			this.player.dispose();
		}
	}

	render() {
		return (
			<EnsureDefaultTheme>
				<Container>
					<Inner data-vjs-player>
						<video
							className="video-js"
							// We always initialize the video as muted to make sure all browsers play our prerolls
							// - see comment in initVideoPlayer()
							muted={true}
							onTouchStart={this.pauseVideo}
							playsInline={this.props.playsInline || true}
							poster={this.props.poster}
							ref={this.videoNode}
							width="100%"
							height="100%"
						/>
					</Inner>
					{!this.state.playing && (
						<PlayIconContainer
							withControlBar
							role="button"
							tabindex="0"
							onClick={() => this.player.play()} dangerouslySetInnerHTML={{__html: PlayIconSVG}} />
					)}
				</Container>
			</EnsureDefaultTheme>
		);
	}
}

export default OnScreenHOC(VideoPlayer, {
	partialVisibility: true,
	once: true
});
