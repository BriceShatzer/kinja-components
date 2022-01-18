/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';

import Theme, { matchBlogGroupToTheme } from 'kinja-components/components/theme';
import Link from '../../elements/link';
import BlogAvatar from 'kinja-components/components/blog-avatar';
import type HeadlineImage from 'kinja-magma/models/HeadlineImage';
import media from '../../../style-utils/media';
import type { PostId } from 'kinja-magma/models/Id';
import { staticHost } from 'kinja-magma/config/server';
import VideoImageOrThumbnail from './video-image-or-thumbnail';
import ReviewScore, { ReviewBadge, MediumSize } from '../../review-score';
import {
	KinjaDealsClick,
	StreamPostClick,
	ExternalPostClick,
	StreamPostClickKala
} from '../../stream/analytics';

type LeftOfHeadlineImageProps = {
	blogGroup?: string,
	image: HeadlineImage,
	permalink: string,
	videoPost: ?boolean,
	pageType: string,
	score: ?string,
	storyTypeItem: ?boolean,
	storyTypeIndex: number,
	isDeals?: boolean,
	isExternalPost?: boolean,
	postId: PostId,
	isNativeAd?: boolean,
	className?: string,
	withBranding?: boolean
};

const FigureAsset = styled.figure`
	float: left;
	margin: 0;
	position: relative;

	${media.mediumUp`
			flex: 1;
			margin-right: 19px;
			max-width: 247px;
		`}

	${media.smallOnly`
			margin-bottom: 8px;
		`}

	${props =>
		props.isCommerce &&
		css`
			&::before {
				background: ${props => props.theme.color.commerce};
				border-radius: 44px;
				background-image: url('${staticHost}/assets/images/commerce-pop.svg');
				background-position: 50% 50%;
				background-repeat: no-repeat;
				content: '';
				display: block;
				height: 44px;
				position: absolute;
				top: 7px;
				left: 7px;
				width: 44px;
				z-index: 92;
			}
		`}

	${props =>
		props.isCommerce && !props.hasBranding &&
		media.mediumUp`
		> a {
			border: 1px solid ${props => props.theme.color.commerce};
			display: block;
		}

		&::before {
			background-size: 20px;
			border-radius: 26px;
			height: 26px;
			width: 26px;
		}
	`}

	${ReviewBadge} {
		${MediumSize}
	}
`;

const BlogAvatarWrapper = styled.div`
	width: 20px;
	height: 20px;
	position: absolute;
	left: 0;
	bottom: -5px;
`;

const OptionalBottomPadding = styled.div`
	background-color: ${props => props.theme.color.whitesmoke};
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	display: block;
	height: 0;
	overflow: ${props => props.hasBranding ? 'visible' : 'hidden'};
	padding-bottom: 56.25%;
	position: relative;
	width: 100%;

	img {
		background: ${props => props.theme.color.whitesmoke};
		overflow: hidden;

		&.lazyloaded {
			background: none;
		}

		&.ls-pre-lazy-img {
			height: 100%;
			background: none;
		}
	}

	video {
		max-width: 100%;
		height: auto;

		/* stylelint-disable property-no-vendor-prefix  */
		&::-webkit-media-controls-start-playback-button {
			display: none;
			-webkit-appearance: none;
		}
		/* stylelint-enable */
	}

	img,
	video {
		height: auto;
		width: 100%;
	}

	${props =>
		props.isAnimated &&
		css`
			cursor: pointer;
			display: block;

			&,
			.img-permalink-sub-wrapper {
				position: relative;
			}

			.animationContainer {
				${media.smallOnly`
					display: none;
				`}
			}
		`}

	${props => props.hasBranding && css`
		border-bottom: 5px solid ${props.theme.color.logo};
	`}
`;

export const LeftOfHeadlineImage = ({
	blogGroup,
	image,
	permalink,
	videoPost,
	pageType,
	score,
	storyTypeItem,
	storyTypeIndex,
	isDeals,
	isExternalPost,
	postId,
	isNativeAd,
	className,
	withBranding
}: LeftOfHeadlineImageProps): React$Node => {
	const needsCommerceBadge = permalink && permalink.includes('kinjadeals.theinventory.') && !isNativeAd;

	const events = [];
	if (storyTypeItem) {
		events.push(StreamPostClick(storyTypeIndex, permalink, pageType));
	}
	if (isDeals) {
		events.push(KinjaDealsClick(storyTypeIndex, permalink));
	}
	if (isExternalPost) {
		events.push(ExternalPostClick(storyTypeIndex, permalink));
	}

	const showVideoThumbnail = videoPost || image.isVideo;
	const hasBranding = withBranding && (blogGroup && blogGroup !== 'default');

	return (
		<Theme blog={matchBlogGroupToTheme(blogGroup)}>
			<FigureAsset className={className} isCommerce={needsCommerceBadge} hasBranding={hasBranding}>
				{score && <ReviewScore score={score}/>}
				<Link
					href={permalink}
					events={events}
					kalaEvent={StreamPostClickKala(postId, pageType)}
				>
					<OptionalBottomPadding
						className={showVideoThumbnail ? '' : 'js_lazy-image'}
						isAnimated={image.isAnimated}
						hasBranding={hasBranding}
					>
						<VideoImageOrThumbnail
							image={image}
							showVideoThumbnail={showVideoThumbnail}
							croppedImage
							noLazy={isNativeAd}
							isLeftOfHeadline
						/>
						{withBranding && blogGroup &&
							<BlogAvatarWrapper>
								<BlogAvatar name={blogGroup} />
							</BlogAvatarWrapper>
						}
					</OptionalBottomPadding>
				</Link>
			</FigureAsset>
		</Theme>
	);
};
