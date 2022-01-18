/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import { TransitionGroup } from 'react-transition-group';
import Media from 'react-media';
import imageUrl from 'kinja-images/imageUrl';
import media from '../../style-utils/media';
import type { Video } from 'module/video/videoRequest';
import PlayButton from './play-button';
import CancelButton from './cancel-button';
import MoreButton from './more-button';
import VideoListItem from './video-list-item';
import DateTime from '../../utils/DateTime';
import Analytics, { type AnalyticsInjectedProps } from '../hoc/analytics';
import getEventLabel from './getEventLabel';

type Props = {
	blogName: string,
	playNextVideo: (isAutoplay: boolean) => void,
	playVideo: (id?: string) => void,
	nowPlayingIndex: number,
	videos: Array<Video>,
	videoPageUrl: string,
	clickOutToVideos?: boolean,
	isVisible: boolean,
	inSidebar: boolean
} & AnalyticsInjectedProps;

type State = {
	countdown: boolean
}

export const endcardCount = 2;

const Container = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: ${props => props.transparent ? 'transparent' : '#fff'};
	overflow: hidden;
	z-index: 1;

	${props => props.transparent && css`
		cursor: pointer;
	`}
`;

const Cover = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	filter: blur(6px);
	background-image: url(${props => props.backgroundImage});
	background-size: cover;
`;

const Content = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.7);
	color: white;
	text-align: left;

	${props => props.countdown && css`
		text-align: center;
	`}
`;

const Header = styled.div`
	text-transform: uppercase;
	font-size: 20px;
	line-height: 26px;
	font-weight: bold;
	margin: 0 31px;

	${media.smallOnly`
		font-size: 15px;
		line-height: 21px;
		flex-shrink: 0;
		margin: 0;
	`}

	${props => props.inSidebar && css`
		font-size: 15px;
		line-height: 21px;
		flex-shrink: 0;
		margin: 0;
	`}

	& span {
		color: ${props => props.theme.color.primary};
	}
`;

const Title = styled.div`
	margin-top: 15px;
	font-size: 19px;
	line-height: 24px;

	${media.smallOnly`
		margin-top: 6px;
		font-size: 16px;
		line-height: 21px;
		flex-shrink: 0;
	`}

	${props => props.inSidebar && css`
		margin-top: 6px;
		font-size: 16px;
		line-height: 21px;
		flex-shrink: 0;
	`}
`;

const PublishDate = styled.div`
	margin-top: 10px;
	font-size: 16px;
	line-height: 19px;
	color: gray;
`;

const Actions = styled.div`
	margin-top: 34px;

	${media.smallOnly`
		display: flex;
		justify-content: center;
		margin-top: 12px;
		flex-shrink: 0;
	`}

	${props => props.inSidebar && css`
		display: flex;
		justify-content: center;
		margin-top: 12px;
		flex-shrink: 0;
	`}
`;

const Endcards = styled(TransitionGroup)`
	overflow: hidden;
	display: flex;
	margin: 20px 30px 0;
	align-items: stretch;

	> * {
		flex: 1;
	}

	> * + * {
		margin-left: 30px;
	}
`;
Endcards.displayName = 'Endcards';

const countdownLength = '6s';

class Endscreen extends React.Component<Props, State> {
	state = { countdown: true };

	onCancel = () => {
		const nowPlaying = this.props.videos[this.props.nowPlayingIndex];
		this.props.ga('Video Player Interaction', 'End Card click - Cancel play up next', getEventLabel(nowPlaying));
		this.setState({ countdown: false });
	}

	onPlayButtonClick = () => {
		const upNext = this.props.videos[this.props.nowPlayingIndex + 1];
		this.props.ga('Video Player Interaction', 'End Card click - Play up next', getEventLabel(upNext));
		this.props.playNextVideo(false);
	}

	onPlayButtonAnimationEnd = () => {
		this.props.playNextVideo(true);
	}

	onReplayClick = () => {
		this.props.playVideo();
	}

	render() {
		const upNextIndex = this.props.nowPlayingIndex + 1;
		const upNext = this.props.videos[upNextIndex];
		const videos = this.props.videos.slice(3);
		const countdown = upNextIndex < 4 && upNext && this.state.countdown;
		let content;

		if (countdown) {
			// there's at least one more video in the carousel: show the countdown
			content = (
				<React.Fragment>
					<Header inSidebar={this.props.inSidebar}>Up next</Header>
					<Title inSidebar={this.props.inSidebar} dangerouslySetInnerHTML={{__html: upNext.postInfo.headline}}/>
					<Media query='(max-width: 37.4375em)'>
						<PublishDate>{new DateTime({ timestamp: Number(upNext.postInfo.publishTimeMillis) }).relativeDateTime}</PublishDate>
					</Media>
					<Actions inSidebar={this.props.inSidebar}>
						<PlayButton
							onClick={this.onPlayButtonClick}
							duration={countdownLength}
							onAnimationEnd={this.onPlayButtonAnimationEnd}
							isVisible={this.props.isVisible}
							inSidebar={this.props.inSidebar}
						/>
						<CancelButton onClick={this.onCancel} inSidebar={this.props.inSidebar}>Cancel</CancelButton>
					</Actions>
				</React.Fragment>
			);
		} else if (upNextIndex < 5 && videos.length === endcardCount) {
			// countdown is over and there are enough videos for the endcards: show the endcards on desktop, button on mobile
			content = (
				<Media query='(max-width: 37.4375em)'>
					{matches => {
						if (matches || this.props.inSidebar) {
							return <MoreButton videoPageUrl={this.props.videoPageUrl} />;
						} else {
							const endcards = videos.map((video, index) =>
								<VideoListItem
									key={video.id}
									video={video}
									clickHandler={this.props.playVideo}
									type="endcard"
									index={index}
									total={videos.length}
									clickOutToVideos={this.props.clickOutToVideos}
								/>);

							return (
								<React.Fragment>
									<Header inSidebar={this.props.inSidebar}>More videos from <span>{this.props.blogName}</span></Header>
									<Endcards>{endcards}</Endcards>
								</React.Fragment>);
						}
					}}
				</Media>
			);
		} else {
			// last video or canceled and there aren't enough videos to show the endcards
			content = null;
		}

		return content ? (
			<Container>
				<Cover backgroundImage={imageUrl(upNext.postInfo.thumbnailId, 'KinjaCenteredMediumAuto')} />
				<Content countdown={countdown}>{content}</Content>
			</Container>
		) : <Container transparent onClick={this.onReplayClick} />;
	}
}

export default Analytics(Endscreen);
