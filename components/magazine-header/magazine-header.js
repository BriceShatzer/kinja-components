/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import { LazyResponsiveImage } from '../elements/image';
import { EnsureDefaultTheme } from '../theme';
import media from 'kinja-components/style-utils/media';
import Link from '../elements/link';
import type { FeaturedMediaJSON } from '../../packages/postbody/BlockNode';
import DeletedEmbed from 'kinja-components/components/postbody/embed-frame/deleted-embed-placeholder';
import type StoryType from 'kinja-magma/models/StoryType';
import type TypedTagData from 'kinja-magma/models/TypedTagData';
import FeaturedPermalinkStoryType from '../featured-permalink-storytype';
import Post from 'kinja-magma/models/Post';
import { MagazineHeaderWrapper } from './magazine-header-wrapper';

type MagazineHeaderProps = {
	featuredMedia: ?FeaturedMediaJSON,
	isSponsored: boolean,
	permalinkHost: string,
	permalink: string,
	storyTypeProperties: ?StoryType,
	title: ?string,
	categoryData: ?TypedTagData,
	subcategoryData: ?TypedTagData
};

const FeaturedMediaWrapper = styled.div`
	display: flex;
	height: auto;
	position: relative;
	width: 100%;

	${media.xlargeUp`
		width: 75%;
	`}
`;

const FeaturedMediaImage = styled.div`
	height: auto;
	width: 100%;
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
`;

const TitleWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 15px 20px;

	${media.xlargeUp`
		align-items: flex-start;
		min-width: 350px;
		order: -1;
		padding: 40px;
		width: 25%;
	`}
`;

const TitleHeading = styled.h1`
	color: ${props => props.theme.color.white};
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
		text-align: left;
	`}

	${media.xxlargeUp`
		font-size: 2.5vw;
	`}

	& a {
		color: ${props => props.theme.color.white};
		line-height: inherit;
		text-decoration: none;

		&:hover {
			color: ${props => props.theme.color.white};
		}
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

const MagazineHeader = (props: MagazineHeaderProps) => {
	const {
		featuredMedia, isSponsored, permalinkHost, permalink, storyTypeProperties, title,
		categoryData, subcategoryData
	} = props;

	let featuredMediaWrapper = null;
	if (featuredMedia) {
		const url = Post.featuredVideoUrl(featuredMedia);
		if (url) {
			featuredMediaWrapper = (
				<FeaturedMediaImage>
					<GenericImageWrapper>
						<VideoIframe src={url}/>
					</GenericImageWrapper>
				</FeaturedMediaImage>
			);
		} else {
			switch (featuredMedia.type) {
				case 'DeletedEmbed': {
					featuredMediaWrapper = (
						<DeletedEmbed originalContent = {featuredMedia.originalContent} />
					);
					break;
				}
				case 'Image': {
					featuredMediaWrapper = (
						<FeaturedMediaImage>
							<LazyResponsiveImage
								id={featuredMedia.id}
								noLazy
								relative
							/>
						</FeaturedMediaImage>
					);
					break;
				}
			}
		}
	}

	return (<EnsureDefaultTheme>
		<MagazineHeaderWrapper>
			<FeaturedMediaWrapper>
				{featuredMediaWrapper}
			</FeaturedMediaWrapper>
			<TitleWrapper>
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
				<TitleHeading>
					<Link
						href={permalink}
						events={[['Permalink page click', 'Permalink page click - post header', 'standard']]}
						dangerouslySetInnerHTML={{__html: title}}
					/>
				</TitleHeading>
			</TitleWrapper>
		</MagazineHeaderWrapper>
	</EnsureDefaultTheme>);
};

export default MagazineHeader;
