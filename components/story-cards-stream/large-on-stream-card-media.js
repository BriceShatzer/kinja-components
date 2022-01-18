// @flow
import * as React from 'react';

import Excerpt from '../post-elements/excerpt';
import KinjaVideo from 'postbody/blockNodes/KinjaVideo';
import StreamVideo from './figure/stream-video';

import { parseFeaturedMedia } from 'postbody/BlockNode';
import { AboveHeadlineImage } from './figure/above-headline-image';

import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type { VideoMeta } from 'kinja-magma/models/VideoMeta';
import type { PageType } from 'kinja-magma/models/PageType';

const aboveHeadlineVideoComponent = (video, index, pageType, post, blog, videoMeta) => {
	if (video.type === 'KinjaVideo') {
		return <StreamVideo
			video={KinjaVideo.fromJSON(video)}
			blogId={blog && blog.id}
			postId={post.id}
			videoMeta={videoMeta}
		/>;
	}
	return <StreamVideo video={parseFeaturedMedia(video)} postId={post.id} />;
};

type MediaType = 'Video' | 'Image' | 'BlipEmbed';
/**
 * Get the best media type for a post.
 *  - Video if the post has a video recommended or a video as a featured asset (KinjaVideo, YoutubeVideo)
 *  - BlipEmbed if the post has no image and starts with a Tweet or Instagram embed
 *  - Image if the post has an image recommended or a featured image asset, or doesn't qualify as a blipEmbed
 */
function getMediaType(post): ?MediaType {
	const showVideo = Boolean(post.frontpageVideo);
	const showHeadlineImage = !showVideo && (Boolean(post.aboveHeadline) || Boolean(post.firstImageNode));
	const showBlipEmbed = !showVideo && !showHeadlineImage && Boolean(post.blipEmbed);
	const showMediaThumbnail = !showVideo && !showHeadlineImage && !showBlipEmbed && Boolean(post.leftOfHeadline);

	if (showVideo) {
		return 'Video';
	}
	if (showHeadlineImage || showMediaThumbnail) {
		return 'Image';
	}
	if (showBlipEmbed) {
		return 'BlipEmbed';
	}

	return null;
}

type LargeOnStreamCardImageProps = {
	post: Post,
	blog: ?Blog,
	pageType: PageType,
	index: number,
	videoMeta?: ?VideoMeta
};
/**
 * Based on the media type, this helper will render the appropriate component
 * to show the selected media from the post.
 */
export default function LargeOnStreamCardMedia({ post, blog, pageType, index, videoMeta }: LargeOnStreamCardImageProps) {
	const mediaType = getMediaType(post);

	switch (mediaType) {
		case 'Video':
			return post.frontpageVideo ?
				aboveHeadlineVideoComponent(post.frontpageVideo, index, pageType, post, blog, videoMeta)
				: null;
		case 'Image': {
			const postImage = post.aboveHeadline || post.leftOfHeadline;
			return (
				postImage ? <AboveHeadlineImage
					image={postImage}
					permalink={post.securePermalink}
					videoPost={post.isVideo}
					pageType={pageType}
					score={post.reviewScore}
					storyTypeItem
					storyTypeIndex={index}
					isDeals={post.isDeals}
					isExternalPost={Boolean(post.permalinkRedirect)}
					postId={post.id}
					croppedImage={false}
				/> : null
			);
		}
		case 'BlipEmbed':
			return post.blipEmbed ? <Excerpt postBody={[post.blipEmbed]} blogGroup={blog && blog.blogGroup} /> : null;
		default: return null;
	}
}
