/* @flow */

import * as React from 'react';
import styled, { css } from 'styled-components';
import Link from '../../elements/link';
import type HeadlineImage from 'kinja-magma/models/HeadlineImage';
import media from '../../../style-utils/media';
import type { PostId } from 'kinja-magma/models/Id';
import { staticHost } from 'kinja-magma/config/server';
import VideoImageOrThumbnail from './video-image-or-thumbnail';
import ReviewScore, { ReviewBadge, MediumSize, LargeSize } from '../../review-score';
import {
	KinjaDealsClick,
	StreamPostClick,
	ExternalPostClick,
	StreamPostClickKala
} from '../../stream/analytics';

type AboveHeadlineImageProps = {
	customEvents?: ?Array<Array<?string | {[key: string]: mixed}>>,
	image: HeadlineImage,
	croppedImage?: boolean,
	permalink: string,
	videoPost: ?boolean,
	pageType: string,
	score: ?string,
	storyTypeItem: ?boolean,
	storyTypeIndex: number,
	isDeals?: boolean,
	isExternalPost?: boolean,
	postId: PostId,
	className?: string,
	noLazy?: boolean
};

export const FigureAsset = styled.figure`
	float: left;
	margin: 0;
	position: relative;
	width: 100%;

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
		props.isCommerce &&
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

		${media.largeUp`
			${LargeSize}
		`}
	}
`;

const OptionalBottomPadding = styled.div`
	height: 0;
	overflow: hidden;
	padding-bottom: ${props => `${props.paddingBottom}%`};
	position: relative;

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
`;

export const AboveHeadlineImage = ({
	customEvents,
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
	className,
	noLazy
}: AboveHeadlineImageProps): React$Node => {
	const { height, width } = image;
	const needsCommerceBadge = permalink.includes('kinjadeals.theinventory.');
	const paddingBottom = (height / width) * 100;

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
	if (customEvents && customEvents.length) {
		events.push(...customEvents);
	}

	const showVideoThumbnail = videoPost || image.isVideo;

	return (
		<FigureAsset className={className} isCommerce={needsCommerceBadge}>
			{score && <ReviewScore score={score}/>}
			<Link
				href={permalink}
				events={events}
				kalaEvent={StreamPostClickKala(postId, pageType)}
			>
				<OptionalBottomPadding
					className={showVideoThumbnail ? '' : 'js_lazy-image'}
					isAnimated={image.isAnimated}
					paddingBottom={paddingBottom}
				>
					<VideoImageOrThumbnail
						image={image}
						isAboveHeadline
						showVideoThumbnail={showVideoThumbnail}
						croppedImage={false}
						noLazy={noLazy}
					/>
				</OptionalBottomPadding>
			</Link>
		</FigureAsset>
	);
};
