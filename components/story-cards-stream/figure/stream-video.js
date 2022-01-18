// @flow

import React from 'react';
import styled from 'styled-components';
import getLinkSupportUrl from '../../postbody/embed-frame/getLinkSupportUrl';

import type { FeaturedMedia } from 'postbody/BlockNode';
import type { PostId, BlogId } from 'kinja-magma/models/Id';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

import KinjaVideo from 'kinja-components/components/postbody/kinja-video';

type StreamVideoProps = {
	video: FeaturedMedia,
	blogId?: ?BlogId,
	postId?: PostId,
	videoMeta?: ?VideoMeta
};

const VideoContainer = styled.div`
	height: 0;
	position: relative;
	overflow: hidden;
	padding-bottom: 56.25%;
	display: block;
	> iframe {
	}
`;

const VideoIframe = styled.iframe`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

function getVideoParams(videoNode: FeaturedMedia, blogId: ?BlogId, postId?: PostId): ?{ [string]: string | number | boolean } {
	switch (videoNode.type) {
		case 'KinjaVideo': {
			return {
				blog_id: blogId || '',
				post_id: postId || '',
				platform: 'web',
				single: true
			};
		}
		default:
			return null;
	}
}

const StreamVideo = (props: StreamVideoProps) => {
	const { video, videoMeta, blogId, postId } = props;
	const params = getVideoParams(video, blogId, postId) || {};
	const additionalParams = {};
	const videoId: ?string = video.type === 'DeletedEmbed' ? null : video.id;
	return (
		<VideoContainer>
			{videoMeta ? (
				<KinjaVideo
					captionsEnabled={true}
					id={videoMeta.id}
					key={videoMeta.id}
					videoMeta={videoMeta} />
			) : (
				<VideoIframe
					width="800"
					height="450"
					frameBorder="0"
					allowFullScreen="allowfullscreen"
					webkitallowfullscreen="webkitAllowFullScreen"
					mozallowfullscreen="mozallowfullscreen"
					src={`${getLinkSupportUrl(videoId, video.type, undefined, params, additionalParams)}`}/>
			)}
		</VideoContainer>
	);
};

export default StreamVideo;
