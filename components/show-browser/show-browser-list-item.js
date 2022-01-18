// @flow
import * as React from 'react';
import styled from 'styled-components';
import VideoThumbnail from '../video-thumbnail';

import type { VideoPostLink } from 'module/video/videoRequest';

const THUMBNAIL_WIDTH = 133;

const Title = styled.div`
	-webkit-line-clamp: 3;
	width: 100%;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
`;

const ItemLink = styled.a`
	display: flex;
	width: 100%;
	height: 75px;
	margin-top: 15px;
	
	&&,
	&&:hover,
	&&:focus {
		color: white;
	}

	&:first-child {
		margin-top: 0;
	}
`;

const VideoImage = styled.div`
	width: ${THUMBNAIL_WIDTH}px;
	min-width: ${THUMBNAIL_WIDTH}px;
	margin-right: 18px;

	background: ${props => props.theme.color.black};
	transition: opacity 600ms ease-in-out;
	will-change: opacity;

	height: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	overflow: hidden;
	position: relative;
`;

type Props = {
	videoPostLink: VideoPostLink,
	onClick: SyntheticMouseEvent<HTMLAnchorElement> => void
}

const ShowBrowserListItem = (props: Props) => (
	<ItemLink href={props.videoPostLink.permalink} onClick={props.onClick}>
		<VideoImage>
			<VideoThumbnail thumbnailId={props.videoPostLink.thumbnail.id} width={THUMBNAIL_WIDTH} />
		</VideoImage>
		<Title dangerouslySetInnerHTML={{__html: props.videoPostLink.headline}} />
	</ItemLink>
);

export default ShowBrowserListItem;
