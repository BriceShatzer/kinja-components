/* @flow */

import * as React from 'react';
import truncate from 'html-truncate';
import styled, { css } from 'styled-components';
import cx from 'classnames';

import Theme, { matchBlogGroupToTheme } from '../../theme';
import BlogAvatar from '../../blog-avatar';
import placeholderImage from 'kinja-images/placeholderImage';
import Link from '../../elements/link';
import assignCommerceSource from 'kinja-components/utils/assignCommerceSource';
import StoryTypeLabel from 'kinja-components/components/story-type-label';
import ReviewScore, { ReviewBadge, MediumSize } from 'kinja-components/components/review-score/review-score';
import VideoImageOrThumbnail from 'kinja-components/components/story-cards-stream/figure/video-image-or-thumbnail';

import type { CategoryStreamSectionItemProps } from '../types';
import HeadlineImage from 'kinja-magma/models/HeadlineImage';
import SimpleImage from 'kinja-magma/models/SimpleImage';

export const Headline = styled.h3`
	font-size: 1.188rem;
	margin-bottom: 0;

	a,
	a:hover,
	a:active,
	a:focus {
		color: ${props => props.theme.color.black};
	}
`;

const ItemImage = styled.div`
	margin-bottom: 5px;
	position: relative;

	${props => props.withBranding && css`
		border-bottom: solid 5px ${props => props.theme.color.logo};
	`}

	${props => props.withBranding && props.isSameBlogGroup && css`
		border-bottom-color: transparent;
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

const Image16x9 = styled.div`
	position: relative;
	padding-bottom: 56.2%;
	background-color: ${props => props.theme.color.whitesmoke};
	overflow: hidden;

	> * {
		position: absolute;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
`;

const StoryTypeLabelWrapper = styled.div`
	overflow: hidden;
	display: flex;

	a {
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
`;

/**
 * An item that is part of a category stream section
 */
const CategoryStreamSectionItem = ({
	events,
	post,
	pageType,
	withBranding = false,
	blogGroup,
	noLazy
}: CategoryStreamSectionItemProps): React$Node => {
	const { formattedHeadline: headline, permalink, isVideo, featuredMedia, sharingMainImage, storyType } = post;
	const category = post.categoryData; // these may be coming through differently for magma
	const subcategory = post.subcategoryData;
	const score = post.reviewScore;

	const Image = () => {
		let image;
		if (sharingMainImage) {
			if (isVideo &&
				featuredMedia &&
				featuredMedia.thumbnail &&
				(featuredMedia.thumbnail.id && featuredMedia.thumbnail.format)
			) {
				image = new HeadlineImage({
					image: new SimpleImage({
						id: featuredMedia.thumbnail.id,
						format: featuredMedia.thumbnail.format
					}),
					isVideo: true,
					width: sharingMainImage.width,
					height: sharingMainImage.height
				});
			} else {
				image = sharingMainImage;
			}

		}

		return image ? (
			<CategoryStreamSectionItemImage
				blogGroup={blogGroup}
				withBranding={withBranding}
				image={image}
				isVideo={post.isVideo}
				noLazy={noLazy}
			/>
		) : (
			<img src={placeholderImage(blogGroup)} />
		);
	};
	const commerceSource = assignCommerceSource(post, pageType);

	if (!permalink) {
		return null;
	}

	return (
		<Theme blog={matchBlogGroupToTheme(blogGroup)}>
			<div className="js_display-category-section__item" data-commerce-source={commerceSource}>

				<ItemImage withBranding={withBranding}>
					<Link href={permalink} events={events}>
						{score && <ReviewScore score={score}/>}
						<Image />
					</Link>
				</ItemImage>

				{storyType && category && subcategory && (
					<StoryTypeLabelWrapper>
						<a href={`/c/${storyType.canonical}/${category.canonicalName}/${subcategory.canonicalName}`}>
							<StoryTypeLabel tag={subcategory.valueDisplay} large />
						</a>
					</StoryTypeLabelWrapper>
				)}

				{headline && <Headline>
					<Link href={permalink} events={events}>
						<div dangerouslySetInnerHTML={{__html: truncate(headline, 130)}} />
					</Link>
				</Headline>}

			</div>
		</Theme>
	);
};

/**
 * The image rendered in a storytype section item
 */
const CategoryStreamSectionItemImage = ({
	blogGroup,
	withBranding = false,
	image,
	isVideo,
	noLazy
}: {
	blogGroup: ?string,
	withBranding: boolean,
	image: HeadlineImage,
	isVideo: boolean,
	noLazy: boolean
}): React$Node => {
	const showVideoThumbnail = isVideo || image.isVideo;

	return (
		<React.Fragment>
			<Image16x9
				className={cx({ 'js_lazy-image': !showVideoThumbnail })}
			>
				<VideoImageOrThumbnail
					image={image}
					showVideoThumbnail={showVideoThumbnail}
					croppedImage
					isLeftOfHeadline
					noLazy={noLazy}
				/>
			</Image16x9>
			{withBranding && blogGroup && (
				<BlogAvatarWrapper>
					<BlogAvatar name={blogGroup} />
				</BlogAvatarWrapper>
			)}
		</React.Fragment>
	);
};

export default CategoryStreamSectionItem;
