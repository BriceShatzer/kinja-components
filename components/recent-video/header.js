// @flow

import * as React from 'react';
import { darken } from 'polished';
import styled, { css } from 'styled-components';
import Media from 'react-media';
import media from '../../style-utils/media';

import Video24Icon from '../icon19/Video24';

import type { VideoType, VideoPosition } from './recent-video';

const Container = styled.div`
	display: flex;
	font-size: 18px;
	line-height: 18px;
	padding-bottom: 20px;
	color: ${props => props.theme.color.darkgray};

	${props => props.position === 'frontpage' && css`
		font-size: 20px;
		line-height: 26px;

		${media.smallOnly`
			padding-bottom: 10px;
			font-weight: bold;
			font-size: 15px;
			line-height: 21px;
			text-transform: uppercase;
		`}

		${props => props.inSidebar && css`
			padding-bottom: 10px;
			font-weight: bold;
			font-size: 15px;
			line-height: 21px;
			text-transform: uppercase;
		`}
	`}

	${props => props.inSidebar && css`
		font-size: 20px;
		line-height: 1.3;
		padding-bottom: 16px;
	`}
`;

const HeaderIcon = styled(Video24Icon)`
	margin-right: 5px;
	margin-top: -2px;
`;

const Strong = styled.strong`
	color: ${props => props.theme.color.black};
`;

const VideoPageLink = styled.a`
	display: none;
	margin-left: auto;
	text-transform: uppercase;
	font-weight: 600;
	float: right;
	font-size: 18px;
	color: ${props => props.theme.color.primary};

	&:hover {
		text-decoration: none;
		color: ${props => darken(0.1, props.theme.color.primary)};
	}

	${media.mediumUp`
		display: block;

		${props => props.position === 'permalink' && css`
			font-size: 13px;
			font-weight: normal;
		`}
	`}
`;

const Link = styled.a`
	color: ${props => props.theme.color.black};
	font-weight: bold;
`;

const HeaderLink = ({
	videoPageUrl,
	videoType,
	blogName,
	recentVideoLabel
}: {
	videoPageUrl: string,
	videoType: VideoType,
	blogName: string,
	recentVideoLabel: string
}) => {
	let text;

	switch (videoType) {
		case 'recent_videos':
			text = `${recentVideoLabel} from ${blogName}`;
			break;
		case 'playlist':
			text = 'Featured Videos';
			break;
		case 'recommended_video':
			text = `Recommended Video from ${blogName}`;
			break;
		default:
			text = '';
	}

	return <Link href={videoPageUrl}>{text}</Link>;
};

const HeaderText = ({
	videoType,
	blogName,
	recentVideoLabel,
	inSidebar
}: {
	videoType: VideoType,
	blogName: string,
	recentVideoLabel: string,
	inSidebar: boolean
}) => {
	if (inSidebar) {
		return <span><Strong>Recent Video</Strong></span>;
	}
	switch (videoType) {
		case 'recent_videos':
			return <span><Strong>{recentVideoLabel}</Strong> from {blogName}</span>;
		case 'playlist':
			return <span><Strong>Featured Videos</Strong></span>;
		case 'recommended_video':
			return <span><Strong>Recommended Video</Strong> from {blogName}</span>;
		default:
			return null;
	}
};

type Props = {
	blogName: string,
	position: VideoPosition,
	videoPageUrl: string,
	multipleVideos: boolean,
	videoType: VideoType,
	inSidebar: boolean
};

const Header = ({
	blogName,
	position,
	videoPageUrl,
	multipleVideos,
	videoType,
	inSidebar
}: Props) => {
	const onPermalink = position === 'permalink';
	const recentVideoLabel = multipleVideos ? 'Recent Videos' : 'Recent Video';
	const linkLabel = onPermalink ? 'View More >' : 'View All';

	return (
		<Container position={position} inSidebar={inSidebar}>
			{onPermalink && !inSidebar && <HeaderIcon />}
			<Media query="(max-width: 53.125em)">
				{matches => matches ?
					<HeaderLink
						videoPageUrl={videoPageUrl}
						videoType={videoType}
						blogName={blogName}
						recentVideoLabel={recentVideoLabel}
					/>
					:
					<HeaderText
						videoType={videoType}
						blogName={blogName}
						recentVideoLabel={recentVideoLabel}
						inSidebar={inSidebar}
					/>
				}
			</Media>
			{!inSidebar && <VideoPageLink href={videoPageUrl} position={position}>{linkLabel}</VideoPageLink>}
		</Container>
	);
};

export default Header;