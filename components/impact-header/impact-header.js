/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import { EnsureDefaultTheme } from '../theme';

import { ImpactHeaderVideo, ImpactHeaderImage, ImpactHeaderTitle, ImpactHeaderOverlay } from './read-only';
import { ImpactHeaderTitleAlignments } from './consts';
import ImpactHeaderBlocknode from 'postbody/blockNodes/ImpactHeader';
import type StoryType from 'kinja-magma/models/StoryType';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import DeletedEmbed from '../postbody/embed-frame/deleted-embed-placeholder';
import { ImpactHeaderContainer } from './impact-header-container';
import type { VideoPlayerProps } from '../video-player/video-player';
import type Videojs from '../video-player/videojs';

const ImpactHeaderTitleBelowContainer = styled(ImpactHeaderContainer)`
	height: auto;
`;

type Props = {
	// the title displayed over the image
	title: ?string,
	// the data object containing media, overlay, and title alignment
	impactHeader: ImpactHeaderBlocknode,
	// if this is a paid link
	isPromoted?: boolean,
	// if this is a sponsored post (Adds sponsored label)
	isSponsored?: boolean,
	// an optional link for the title
	permalink?: string,
	permalinkHost?: string,
	// an optional story type for the story type box
	storyType?: ?StoryType,
	categoryData?: ?TypedTagData,
	subcategoryData?: ?TypedTagData,
	// the function that resolves the mp4 source for looping videos
	getLoopingVideoSource?: (string) => Promise<?string>,
	// the function that fetches video metadata by a video id
	fetchVideoMetadata?: (videoId: string) => Promise<VideoMeta>,
	// the function that sets up the video player on the page
	createVideoPlayer?: (nodeOrId: HTMLElement | string, config: VideoPlayerProps) => Promise<Videojs>
};

export default function ImpactHeader(props: Props) {
	const { createVideoPlayer, fetchVideoMetadata, impactHeader, getLoopingVideoSource, isPromoted,
		isSponsored, permalink, permalinkHost, storyType, title, categoryData, subcategoryData } = props;
	const { media, overlay, titleAlignment } = impactHeader;

	const ContainerComponent = titleAlignment === ImpactHeaderTitleAlignments.Below ? ImpactHeaderTitleBelowContainer : ImpactHeaderContainer;
	return (
		<EnsureDefaultTheme>
			<ContainerComponent>
				{media.type === 'DeletedEmbed' && (
					<DeletedEmbed
						originalContent={media.originalContent}
					/>
				)}
				{media.type === 'KinjaVideo' && (
					<ImpactHeaderVideo
						featuredMedia={media}
						fetchVideoMetadata={fetchVideoMetadata}
						createVideoPlayer={createVideoPlayer}
						getLoopingVideoSource={getLoopingVideoSource}
					/>
				)}
				{media.type === 'Image' && (
					<ImpactHeaderImage featuredMedia={media} inline={titleAlignment === ImpactHeaderTitleAlignments.Below} />
				)}
				<ImpactHeaderOverlay overlay={overlay} titleAlignment={titleAlignment}>
					{title ? <ImpactHeaderTitle
						title={title}
						isPromoted={isPromoted}
						isSponsored={isSponsored}
						storyType={storyType}
						categoryData={categoryData}
						subcategoryData={subcategoryData}
						permalinkHost={permalinkHost}
						permalink={permalink}
						titleAlignment={titleAlignment}
						overlay={overlay}
					/> : null}
				</ImpactHeaderOverlay>
			</ContainerComponent>
		</EnsureDefaultTheme>
	);
}
