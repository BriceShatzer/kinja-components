// @flow
import * as React from 'react';
import { VideoPlayer } from '../../video-player';
import VideoThumbnail from '../../video-thumbnail';
import CaptionContainer from '../../caption-container';
import styled from 'styled-components';
import imageUrl from 'kinja-images';

import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type { InlineNode } from 'postbody/InlineNode';

type Props = {
	videoMeta: VideoMeta,
	id?: string,
	thumbnailOnly?: boolean,
	captionsEnabled?: boolean,
	caption?: ?Array<InlineNode>,
	playWhenInView?: boolean
};

export const KinjaVideoContainer = styled.div`
	margin-bottom: 1.5rem;
`;

export default function KinjaVideo({
	videoMeta,
	id,
	thumbnailOnly,
	captionsEnabled = true,
	caption,
	playWhenInView
}: Props) {
	if (thumbnailOnly && videoMeta.poster) {
		return (
			<VideoThumbnail thumbnailId={videoMeta.poster.id} standalone className="has-video" />
		);
	}

	return (
		<KinjaVideoContainer className="js_video-wrapper" id={id} data-caption={JSON.stringify(caption)}>
			<VideoPlayer
				sources={[{
					src: videoMeta.streamingUrl || '',
					type: 'application/x-mpegURL'
				}]}
				poster={videoMeta.poster ? imageUrl(videoMeta.poster.id, 'CenteredWideExtraLargeAuto', videoMeta.poster.format) : ''}
				aspectRatio="16:9"
				autoplay={false}
				controls={true}
				muted={true}
				playsInline={true}
				preload="none"
				playWhenInView={playWhenInView}
			/>
			{captionsEnabled && caption && caption.length ?
				<CaptionContainer
					caption={caption}
					editable={false}
				/>
				: null
			}
		</KinjaVideoContainer>
	);
}
