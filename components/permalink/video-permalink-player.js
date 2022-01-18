// @flow

import * as React from 'react';
import styled from 'styled-components';
import querystring from 'query-string';
import { throttle } from 'lodash';

import imageUrl from 'kinja-images/imageUrl';
import { VideoPlayer, videoAnalytics } from 'kinja-components/components/video-player';
import HeightForVideoPlayer from  './height-for-video-player';
import getPlayerContentType from 'kinja-components/utils/getPlayerContentType';
import media from 'kinja-components/style-utils/media';
import DeletedEmbed from '../postbody/embed-frame/deleted-embed-placeholder';
import getPosterImage from 'postbody/utils/getPosterImage';

import type { Experiments } from 'kinja-components/components/video-player';
import type { FeaturedMediaJSON } from 'postbody/BlockNode';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type Videojs, { VideojsMetadata } from 'kinja-components/components/video-player/videojs';

import {
	mainVideoRatioOnDesktop,
	mainVideoRatioOnHugeDesktop
} from  './height-for-video-player';

type Props = {
	featuredMedia: FeaturedMediaJSON,
	featuredVideo?: VideoMeta,
	autoplay?: boolean,
	isEditor?: boolean,
	experiments?: Experiments,
	contentType?: string
};

type State = {
	isSticky: boolean,
	featuredVideoState: string
};

const VideoHeaderWrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 100vw;

	${HeightForVideoPlayer}
`;

const ShowBrowserWrapper = styled.div`
	width: 25%;
	z-index: 0;

	${media.largeDown`
		display: none;
	`}

	@media screen and (min-width: 2200px) {
		width: 20%;
	}
`;

export const VideoPlayerWrapper = styled.div`
	width: calc(${mainVideoRatioOnDesktop} * 100%);

	${media.largeDown`
		width: 100%;
	`}

	@media screen and (min-width: 2200px) {
		width: calc(${mainVideoRatioOnHugeDesktop} * 100%);
	}

	${HeightForVideoPlayer}
`;

type VideoPermalinkHeaderProps = {
	isEditor?: boolean,
	autoplay?: boolean,
	featuredMedia: FeaturedMediaJSON,
	featuredVideo?: VideoMeta
};

export const VideoPermalinkHeader = ({
	featuredVideo,
	featuredMedia,
	isEditor = false,
	autoplay = true
}: VideoPermalinkHeaderProps) => (
	<VideoHeaderWrapper className="video-with-playlist">
		<VideoPlayerWrapper>
			<VideoPermalinkPlayer
				featuredMedia={featuredMedia}
				featuredVideo={featuredVideo}
				isEditor={isEditor}
				autoplay={autoplay}
			/>
		</VideoPlayerWrapper>
		<ShowBrowserWrapper className='js_show-browser' />
	</VideoHeaderWrapper>
);


const VideoPlayerIframe = styled.iframe`
	width: 100%;

	${HeightForVideoPlayer}

	${props => props.isSticky && `
		position: fixed;
		top: 0px;
		z-index: 150;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
	`}
`;

const VideoJSPlayerWrapper = styled.div`
	width: 100%;

	${HeightForVideoPlayer}

	${props => props.isSticky && `
		position: fixed;
		top: 0px;
		z-index: 150;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
	`}
`;

class VideoPermalinkPlayer extends React.Component<Props, State> {
	state = {
		isSticky: false,
		featuredVideoState: ''
	}
	handleStickyVideoListener: () => void
	playerInstance: Videojs

	componentDidMount() {
		this.handleStickyVideoListener = throttle(this.handleStickyVideo, 100);
		this.checkForVideoHeightThreshold();
		window.addEventListener('resize', this.checkForVideoHeightThreshold);
		window.addEventListener('message', this.updateVideoState);
	}

	componentWillUnMount() {
		window.removeEventListener('resize', this.checkForVideoHeightThreshold);
		window.removeEventListener('scroll', this.handleStickyVideoListener);
		window.removeEventListener('message', this.updateVideoState);
	}

	checkForVideoHeightThreshold = () => {
		const bodyHeight = window.innerHeight;
		const videoHeight = document.getElementsByClassName('js_video-wrapper')[0].clientHeight;
		const videoWindowHeightThreshold = 0.4;

		if (videoHeight < bodyHeight * videoWindowHeightThreshold) {
			window.addEventListener('scroll', this.handleStickyVideoListener);
		} else {
			window.removeEventListener('scroll', this.handleStickyVideoListener);
		}
	}

	updateVideoState = (event: MessageEvent) => {
		if (event.origin === window.origin && event.data && event.data.featuredVideoState) {
			this.setState({
				featuredVideoState: String(event.data.featuredVideoState)
			});
		}
	}

	handleStickyVideo = () => {
		const scrollPosition = window.pageYOffset;
		const header = document.getElementsByClassName('js_header')[0];
		// fallback to current header height if not found
		const navHeight = header ? header.clientHeight : 95;
		let isSticky = false;

		if (navHeight < scrollPosition) {
			if (this.state.featuredVideoState === 'play') {
				isSticky = true;
			}
		}

		this.setState({
			isSticky
		});
	}

	onVideoJSPlayerLoad = (playerInstance: Videojs) => {
		this.playerInstance = playerInstance;

		const { featuredMedia, featuredVideo } = this.props;

		if (featuredVideo) {
			const contentType = getPlayerContentType({ pageType: 'permalink', isPostVideo: true });

			const metaBlog = window.kinja.meta.blog;
			videoAnalytics(playerInstance, {
				contentType: contentType || '',
				position: 'default',
				siteSection: metaBlog ? metaBlog.displayName : '',
				website: metaBlog ? metaBlog.blogGroup : '',
				experiments: this.props.experiments || {}
			});

			// additional event data for analytics
			playerInstance.trigger('loadedmanualmeta', {
				network: featuredVideo.network || '',
				title: featuredVideo.title,
				id: featuredMedia.type === 'KinjaVideo' ? featuredMedia.id : ''
			});
		}
	}

	triggerVideoMetaEvent = (media: VideojsMetadata) => {
		this.playerInstance.trigger('loadedmanualmeta', media);
	}

	render() {
		const { featuredMedia, featuredVideo, autoplay = true, isEditor = false } = this.props;

		const videoPath = '/ajax/inset/iframe';
		let videoParams;

		if (featuredMedia.id) {
			switch (featuredMedia.type) {
				case 'YoutubeVideo':
					videoParams = {
						id: `youtube-video-${featuredMedia.id}`,
						start: featuredMedia.start
					};
					break;
				case 'KinjaVideo':
					videoParams = {
						id: `kinjavideo-${featuredMedia.id}`,
						platform: isEditor ? 'editor' : 'web',
						mute: true,
						autoplay,
						captions: featuredVideo && featuredVideo.captions,
						cloudinaryImageOverride: featuredMedia.thumbnail && featuredMedia.thumbnail.id,
						cloudinaryImageOverrideFormat: featuredMedia.thumbnail && featuredMedia.thumbnail.format
					};
					break;
				default:
					break;
			}
		}

		if (featuredMedia.type === 'DeletedEmbed') {
			return <DeletedEmbed
				originalContent={featuredMedia.originalContent}
			/>;
		} else {
			const videoUrl = `${videoPath}?${querystring.stringify(videoParams)}`;
			const posterImage = featuredMedia ? getPosterImage(featuredMedia) : null;

			const videoJSPlayerProps = featuredVideo && {
				aspectRatio: '16:9',
				autoplay,
				captions: featuredVideo.captions,
				controls: true,
				unmuteAfterPreroll: true,
				playsInline: true,
				poster: posterImage && posterImage.id ? imageUrl(posterImage.id, 'WideSuperLarge', posterImage.format) : '',
				preload: 'auto',
				sources: [{
					src: featuredVideo.streamingUrl || '',
					type: 'application/x-mpegURL'
				}],
				onLoad: this.onVideoJSPlayerLoad
			};

			return videoJSPlayerProps ? (
				<VideoJSPlayerWrapper
					className="js_video-wrapper"
					id={featuredVideo ? featuredVideo.id : null}
					data-caption={JSON.stringify(featuredVideo && featuredVideo.captions ? featuredVideo.captions : [])}
					isSticky={this.state.isSticky}
				>
					<VideoPlayer {...videoJSPlayerProps} />
				</VideoJSPlayerWrapper>
			) : (
				<VideoPlayerIframe
					className="js_video-wrapper"
					id={featuredVideo ? featuredVideo.id : null}
					data-caption={JSON.stringify(featuredVideo && featuredVideo.captions ? featuredVideo.captions : [])}
					isSticky={this.state.isSticky}
					src={videoUrl}
					allowFullScreen="allowfullscreen"
					webkitallowfullscreen="webkitAllowFullScreen"
					mozallowfullscreen="mozallowfullscreen"
				/>
			);
		}
	}
}

export default VideoPermalinkPlayer;
