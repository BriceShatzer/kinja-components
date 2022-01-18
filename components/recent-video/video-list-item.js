/* @flow */

import React from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Analytics, { type AnalyticsInjectedProps } from '../hoc/analytics';
import DateTime from '../../utils/DateTime';
import media from '../../style-utils/media';
import { EnsureDefaultTheme } from '../theme';
import VideoThumbnail from '../video-thumbnail';
import getEventLabel from './getEventLabel';

import type { Video } from 'module/video/videoRequest';

const Title = styled.div`
	font-weight: bold;
	font-size: 16px;
	line-height: 21px;

	${props => props.nowPlaying && css`
		color: ${props => props.theme.color.darkgray};
	`}

	${media.mediumUp`
		font-size: 19px;
		line-height: 24px;
		margin-top: 12px;

		${props => props.standalone && css`
			font-size: 24px;
			line-height: 31px;
			margin-top: 0;
			padding: 11px 0 3px;
		`}

	`}
`;

const Item = styled.a`
	position: relative;
	overflow: hidden;
	box-sizing: border-box;
	cursor: pointer;
	&& {
		color: ${props => props.theme.color.black};
	}

	&&:hover,
	&&:focus {
		color: ${props => props.theme.color.black};
		text-decoration: none;
	}

	&&:hover ${Title} {
		text-decoration: underline;
	}

	${props => props.type === 'carousel' && css`
		${media.smallOnly`
			margin-bottom: 15px;
			display: flex;
			align-items: flex-start;
		`}
	`}

	${props => props.type === 'endcard' && css`
		&& {
			color: ${props => props.theme.color.white};
		}

		&&:hover,
		&&:focus {
			color: ${props => props.theme.color.white};
		}

		&.transition-appear {
			opacity: 0;
		}

		&.transition-appear-active {
			opacity: 0.5;
			transition: opacity 300ms ease-in-out;
			transition-delay: ${props => props.index * 100}ms;
		}
	`}
`;

Item.displayName = 'Item';

const Metadata = styled.div`
	${media.smallOnly`
		width: 63%;
		flex: none;
		margin-left: 15px;
	`}
`;

const PublishDate = styled.div`
	color: ${props => props.theme.color.gray};
	font-size: 14px;
	line-height: 19px;
	margin-top: 3px;

	${props => props.type === 'endcard' && `
		opacity: 0.75;
	`}

	${props => props.standalone && css`
		margin-top: 0;
	`}
`;

const videoListType = {
	carousel: 'Carousel',
	endcard: 'End Card'
};

type Props = {
	clickHandler: (id: string) => void,
	video: Video,
	type: $Keys<typeof videoListType>,
	nowPlaying?: boolean,
	index: number,
	total: number,
	standalone?: boolean,
	clickOutToVideos?: boolean
} & AnalyticsInjectedProps;

export const VideoListItem = ({
	clickHandler,
	video,
	type,
	nowPlaying,
	index,
	total,
	standalone,
	clickOutToVideos,
	ga
}: Props) => {
	const permalink = clickOutToVideos ? video.postInfo && video.postInfo.permalink : null;

	const onClick = () => {
		if (!nowPlaying) {
			ga(
				'Video Player Interaction',
				`${videoListType[type]} click - position ${index + 1} of ${total}`,
				getEventLabel(video),
				{
					hitCallback: () => {
						if (clickOutToVideos) {
							window.location.href = permalink;
						}
					}
				}
			);

			if (!clickOutToVideos) {
				clickHandler(video.id);
			}
		}
	};

	return (
		<EnsureDefaultTheme>
			<CSSTransition
				classNames="transition"
				appear={type === 'endcard'}
				addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
			>
				<Item
					href={permalink}
					type={type}
					index={index}
					onClick={onClick}
				>
					<VideoThumbnail
						thumbnailId={video.postInfo.thumbnailId}
						nowPlaying={nowPlaying}
						standalone={standalone}
						width={type === 'endcard' ? 400 : 320}
						noLazy
					/>
					<Metadata>
						<Title
							nowPlaying={nowPlaying}
							standalone={standalone}
							dangerouslySetInnerHTML={{__html: video.postInfo.headline}}/>
						<PublishDate standalone={standalone} type={type}>
							{new DateTime({ timestamp: video.postInfo.publishTimeMillis, timezone: 'America/New_York'}).relativeDateTime}
						</PublishDate>
					</Metadata>
				</Item>
			</CSSTransition>
		</EnsureDefaultTheme>
	);
};

export default Analytics(VideoListItem);
