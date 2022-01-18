/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { imageFormatFromString } from 'postbody/Image';
import { LazyResponsiveImage } from '../elements/image';
import media from 'kinja-components/style-utils/media';
import Link from '../elements/link';
import { EnsureDefaultTheme } from '../theme';
import type { FeaturedMediaJSON } from '../../../postbody/BlockNode';
import getPosterImage from '../../../postbody/utils/getPosterImage';
import DeletedEmbed from 'kinja-components/components/postbody/embed-frame/deleted-embed-placeholder';
import type StoryType from 'kinja-magma/models/StoryType';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
import FeaturedPermalinkStoryType from '../featured-permalink-storytype';
import Post from 'kinja-magma/models/Post';

import { VideoPlayer } from 'kinja-components/components/video-player';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import imageUrl from 'kinja-images/imageUrl';

import { HeaderWrapper } from './header-wrapper';

type FeaturedHeaderProps = {
	title: ?string,
	featuredMedia: ?FeaturedMediaJSON,
	featuredVideo: ?VideoMeta,
	permalinkHost: string,
	permalink: string,
	storyTypeProperties: ?StoryType,
	isSponsored: boolean,
	categoryData: ?TypedTagData,
	subcategoryData: ?TypedTagData
}

const FeaturedMediaWrapper = styled.div`
	position: relative;
	width: 100%;

	${media.xlargeUp`
		padding: 0 2.5%;
	`}
`;

const FeaturedMediaImageWrapper = styled.div`
	width: 100%;

	&::after {
		${media.xlargeUp`
			background: ${props => props.theme.color.white};
			bottom: 0;
			box-sizing: inherit;
			content: '';
			display: block;
			height: 25%;
			left: 0;
			position: absolute;
			right: 0;
			width: 100%;
		`}
	}
`;

const GenericImageWrapper = styled.div`
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	display: block;
	height: 0;
	max-width: 100%;
	overflow: hidden;
	padding-bottom: 56%;
	position: relative;
	width: 100%;
	${media.xlargeUp`
		z-index: 1;
	`}
	video {
		width: 100%;
	}
`;

const FeaturedTitleWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 15px 20px;

	${media.xlargeUp`
		order: -1;
		padding: 40px;
	`}
`;

const TitleTag = styled.h1`
	font-size: 8.5vw;
	font-weight: normal;
	line-height: 1.1;
	text-align: center;
	margin: 0 auto;
	max-width: 1180px;
	width: 100%;

	${media.mediumUp`
		font-size: 6vw;
	`}

	${media.xlargeUp`
		font-size: 3vw;
	`}

	& a {
		color: ${props => props.theme.color.white};
	}

	& a:hover {
		color: ${props => props.theme.color.white};
	}
`;

const Sponsor = styled.div`
	color: ${props => props.theme.color.gray};
	font-size: 13px;
	text-transform: uppercase;
`;

const VideoIframe = styled.iframe`
	width: 100%;
	height: 100%;
	position: absolute;
`;

const FeaturedHeader = (props: FeaturedHeaderProps) => {
	const { title, featuredMedia, featuredVideo, permalinkHost, permalink, storyTypeProperties, isSponsored,
		categoryData, subcategoryData } = props;

	const posterImage = featuredMedia ? getPosterImage(featuredMedia) : null;

	const videoJSPlayerProps = featuredVideo && {
		adTagUrl: featuredVideo.monetizable ? featuredVideo.adschedule : '',
		aspectRatio: '16:9',
		autoplay: false,
		captions: featuredVideo.captions,
		controls: true,
		muted: false,
		playsInline: true,
		poster: posterImage && posterImage.id ? imageUrl(posterImage.id, 'WideSuperLarge', posterImage.format) : '',
		preload: 'auto',
		sources: [{
			src: featuredVideo.streamingUrl || '',
			type: 'application/x-mpegURL'
		}]
	};

	let featuredMediaWrapper = null;
	if (featuredMedia) {
		const url = Post.featuredVideoUrl(featuredMedia);
		if (url) {
			featuredMediaWrapper = (
				<FeaturedMediaImageWrapper>
					<GenericImageWrapper>
						{featuredVideo && videoJSPlayerProps ? (
							<div className="js_video-wrapper" id={featuredVideo.id}>
								<VideoPlayer {...videoJSPlayerProps} />
							</div>
						) : (
							<VideoIframe src={url}/>
						)}
					</GenericImageWrapper>
				</FeaturedMediaImageWrapper>
			);
		} else {
			switch (featuredMedia.type) {
				case 'DeletedEmbed': {
					featuredMediaWrapper = (
						<FeaturedMediaImageWrapper>
							<DeletedEmbed originalContent = {featuredMedia.originalContent} />
						</FeaturedMediaImageWrapper>
					);
					break;
				}
				case 'Image': {
					const isAnimated = imageFormatFromString(featuredMedia.format) === 'gif';
					featuredMediaWrapper = (
						<FeaturedMediaImageWrapper>
							<GenericImageWrapper>
								<LazyResponsiveImage
									id={featuredMedia.id}
									format={featuredMedia.format}
									// Making sure we're always rendering the largest video we can
									transform={isAnimated ? 'WideSuperLarge' : null}
									noLazy
									relative
								/>
							</GenericImageWrapper>
						</FeaturedMediaImageWrapper>
					);
					break;
				}
			}
		}
	}

	return (<EnsureDefaultTheme>
		<HeaderWrapper>
			<FeaturedMediaWrapper>
				{featuredMediaWrapper}
			</FeaturedMediaWrapper>
			<FeaturedTitleWrapper>
				{isSponsored &&
					<Sponsor>
						Sponsored
					</Sponsor>}
				{storyTypeProperties &&
					<FeaturedPermalinkStoryType
						permalinkHost={permalinkHost}
						subcategoryData={subcategoryData}
						categoryData={categoryData}
						storyType={storyTypeProperties}
					/>
				}
				<TitleTag>
					{title && <Link
						href={permalink}
						events={[['Permalink page click', 'Permalink page click - post header', 'standard']]}
						dangerouslySetInnerHTML={{__html: title}}
					/>}
				</TitleTag>
			</FeaturedTitleWrapper>
		</HeaderWrapper>
	</EnsureDefaultTheme>);
};

export default FeaturedHeader;
