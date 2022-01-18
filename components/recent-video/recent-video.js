/* @flow */

import * as React from 'react';

import Header from './header';
import VideoJSPlayer from './videojs-player';
import Carousel from './carousel';
import type { Video } from 'module/video/videoRequest';
import styled, { css } from 'styled-components';
import media from '../../style-utils/media';
import Theme from '../theme';
import { blogThemes as Themes } from '../theme/themes';
import DateTime from '../../utils/DateTime';
import Analytics, { type AnalyticsInjectedProps } from '../hoc/analytics';
import getEventLabel from './getEventLabel';
import Byline from '../story-cards-stream/byline';

import type { Experiments } from '../video-player';

export type VideoPosition = 'permalink' | 'frontpage';
export type VideoType = 'playlist' | 'recent_videos' | 'recommended_video';

export type Props = {
	blogGroup: $Keys<typeof Themes>,
	blogName: string,
	hostName: string,
	carouselEnabled?: boolean,
	videos: Array<Video>,
	position: VideoPosition,
	videoType: VideoType,
	clickOutToVideos?: boolean,
	isMagma?: boolean,
	inSidebar?: boolean,
	experiments: Experiments,
	contentType: string,
	debugMode?: boolean
} & AnalyticsInjectedProps;

type State = {
	nowPlayingIndex: number,
	// this is a proxy between the endscreen and the video player so we can set the play type in the latter
	isAutoplay: boolean,
	isReplay: boolean
};

const VideoContainer = styled.div`
	${props => props.position === 'permalink' && !props.inSidebar && css`
		border: ${props => props.theme.color.lightgray} 1px solid;
		box-shadow: ${props => props.theme.color.lightgray} 0 2px 5px;
		margin: 2rem auto;
		padding: 1.125rem;
		border-radius: 5px;
		clear: both;
		max-width: ${props => props.isMagma ? '636px' : 'auto'};
	`}

	${props => props.position === 'frontpage' && !props.isMagma && !props.inSidebar && media.largeUp`
    	padding-right: 60px;
	`}

	${props => props.inSidebar && media.largeDown`
		margin: 32px auto;
	`}
`;

const Title = styled.div`
	font-weight: bold;
	padding: 20px 0 15px;

	${props => props.position === 'permalink' && css`
		padding: 8px 0;
		font-size: 20px;
		line-height: 26px;
	`}

	${props => props.position === 'frontpage' && css`
		font-size: 24px;
		line-height: 31px;
		padding: 11px 0 3px;
	`}

	${props => props.inSidebar && css`
		font-size: 18px;
		line-height: 23px;
	`}
`;

const TitleLink = styled.a`
	&& {
		color: ${props => props.theme.color.black};
		font-weight: bold;
	}

	&&:hover,
	&&:focus {
		color: ${props => props.theme.color.black};
		text-decoration: underline;
	}
`;

const PublishDate = styled.div`
	color: ${props => props.theme.color.gray};
	font-size: 14px;
	line-height: 19px;
`;

export class RecentVideo extends React.Component<Props, State> {
	state = {
		nowPlayingIndex: 0,
		isAutoplay: true,
		isReplay: false
	};

	playVideo = (id?: string) =>
		this.setState(prevState => ({
			nowPlayingIndex: id ? this.props.videos.findIndex(video => video.id === id) : prevState.nowPlayingIndex,
			isAutoplay: false,
			isReplay: !id
		}));

	playNextVideo = (isAutoplay: boolean = false) => {
		if (this.state.nowPlayingIndex < 3) {
			this.setState(prevState => ({
				nowPlayingIndex: prevState.nowPlayingIndex + 1,
				isAutoplay,
				isReplay: false
			}));
		}
	};

	onTitleClick = ({ currentTarget }: SyntheticMouseEvent<HTMLAnchorElement>) => {
		if (this.props.clickOutToVideos) {
			const nowPlaying = this.props.videos[this.state.nowPlayingIndex];
			this.props.ga(
				'Video Player Interaction',
				'Title click',
				getEventLabel(nowPlaying),
				{
					hitCallback: () => window.location.href = currentTarget.href
				}
			);
		}
	};

	render() {
		if (!this.props.videos || this.props.videos.length === 0) {
			return null;
		}
		const showCarousel = this.props.carouselEnabled && this.props.videos.length > 1;
		const videoPageUrl = `https://${this.props.hostName}/video`;
		const nowPlaying = this.props.videos[this.state.nowPlayingIndex];

		return (
			<Theme blog={this.props.blogGroup}>
				<VideoContainer position={this.props.position} isMagma={this.props.isMagma} inSidebar={this.props.inSidebar}>
					<Header
						blogName={this.props.blogName}
						position={this.props.position}
						videoPageUrl={videoPageUrl}
						multipleVideos={this.props.videos.length > 1}
						videoType={this.props.videoType}
						inSidebar={this.props.inSidebar || false}
					/>
					<VideoJSPlayer
						{...this.state}
						videos={this.props.videos}
						blogName={this.props.blogName}
						playNextVideo={this.playNextVideo}
						playVideo={this.playVideo}
						videoPageUrl={videoPageUrl}
						clickOutToVideos={this.props.clickOutToVideos}
						inSidebar={this.props.inSidebar}
						experiments={this.props.experiments}
						contentType={this.props.contentType}
						debugMode={this.props.debugMode}
					/>
					<Title position={this.props.position} inSidebar={this.props.inSidebar} >
						<TitleLink
							onClick={this.onTitleClick}
							dangerouslySetInnerHTML={{__html: nowPlaying.postInfo.headline}}
							href={nowPlaying.postInfo && nowPlaying.postInfo.permalink}
						/>
					</Title>
					{this.props.inSidebar && nowPlaying.post ? (
						<Byline
							pageType="permalink"
							post={nowPlaying.post}
							index={0}
							authors={nowPlaying.authors}
						/>
					) : (
						<PublishDate>
							{new DateTime({ timestamp: nowPlaying.postInfo.publishTimeMillis, timezone: 'America/New_York' }).relativeDateTime}
						</PublishDate>
					)}
					{showCarousel &&
						<Carousel
							nowPlaying={nowPlaying}
							videos={this.props.videos}
							onVideoClick={this.playVideo}
							clickOutToVideos={this.props.clickOutToVideos}
						/>}
				</VideoContainer>
			</Theme>
		);
	}
}

export default Analytics(RecentVideo);
