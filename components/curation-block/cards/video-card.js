// @flow

import * as React from 'react';
import { type Video } from 'kinja-mantle/module/video/videoRequest';
import styled from 'styled-components';
import { CardContainer } from './static-card';
import Headline from './components/headline';
import Link from '../../elements/link';
import KinjaVideo from 'kinja-components/components/postbody/kinja-video';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';

type Props = {
	video: Video,
	thumbnailOnly?: boolean,
	className?: string
}

export const TextContainer = styled.div`
	a:hover {
		color: inherit;
	}
`;

// TODO: transform props earlier
export const transformVideoProps = (video: Video): VideoMeta => {
	const {
		id,
		postInfo,
		network,
		streamingUrl,
		poster,
		adschedule,
		captions
	} = video;

	return {
		id,
		title: postInfo.headline,
		videoPage: false,
		videoRecirc: false,
		network,
		streamingUrl,
		poster,
		adschedule,
		captions,
		description: '',
		isLooping: false,
		monetizable: true, // TODO distinguish between monetizable and non-monetizable
		programId: '',
		tags: [],
		publishedTimestamp: '',
		duration: null
	};
};

export default function VideoCard(props: Props) {
	const { video, thumbnailOnly, className } = props;

	if (!video) {
		// Do not break if a video is missing
		return null;
	}

	return (
		<CardContainer className={className}>
			<Link href={thumbnailOnly && video.postInfo.permalink}>
				<KinjaVideo id={video.id} videoMeta={transformVideoProps(video)} thumbnailOnly={thumbnailOnly}/>
			</Link>
			<TextContainer>
				<Link href={video.postInfo.permalink}>
					<Headline level={4} dangerouslySetInnerHTML={{__html: video.postInfo.headline}}/>
				</Link>
			</TextContainer>
		</CardContainer>
	);
}
