/* @flow */

import * as React from 'react';

import NativeAd from 'kinja-magma/models/NativeAd';
import type Blog from 'kinja-magma/models/Blog';

import PopularPostItem from 'kinja-components/components/sidebar/popular-posts/popular-post-item';
import { isHostInternal, isOnion, isOnionLabs, isStudioAtGizmodo, isCommerce, isRegularEditorial } from '../native-ad-helpers';

export type LeftRailNativeAdType = {
	post: NativeAd,
	index: number,
	currentBlog: Blog
};

const LeftRailNativeAd = (props: LeftRailNativeAdType): React$Node => {
	const { post: nativeAdPost, currentBlog } = props;
	const isExternalNativeAd =
		(nativeAdPost.postId === '' || nativeAdPost.postId === 0 || nativeAdPost.postId === '0') &&
		!isHostInternal(nativeAdPost.blogCanonicalHost);

	const post = NativeAd.toSidebarPost(nativeAdPost);

	// Everything that is from `The Inventory` or `Kinja Deals` should be treated as `Sponsored`
	if (nativeAdPost.blogCanonicalHost && nativeAdPost.blogCanonicalHost.indexOf('theinventory.com') !== -1) {
		post.sponsored = true;
	}

	// Everything that is `Native Ad` is an editorial `Promoted` post
	if (nativeAdPost.postType === 'Native Ad') {
		post.editorial = true;
	}

	if (
		!isOnion(nativeAdPost) &&
		!isOnionLabs(nativeAdPost) &&
		!isStudioAtGizmodo(nativeAdPost) &&
		!isCommerce(nativeAdPost) &&
		!isRegularEditorial(post) &&
		nativeAdPost.post_authorByline
	) {
		post.defaultBlogDisplayName = nativeAdPost.post_authorByline;
	} else if ((isStudioAtGizmodo(nativeAdPost) || isRegularEditorial(post)) && !isOnion(nativeAdPost) && nativeAdPost.post_authorByline) {
		post.authorNameOrByline = nativeAdPost.post_authorByline;
	} else if (isOnion(nativeAdPost) || isOnionLabs(nativeAdPost)) {
		post.defaultBlogDisplayName = 'The Onion';
		post.defaultBlogGroup = nativeAdPost.blogBlogGroup || '';
		post.defaultBlogRecircGroup = isOnion(nativeAdPost) ? 'fmgSatire' : 'fmgBusiness';
		post.authorNameOrByline = '';
	}

	let parentBlogName;
	if (nativeAdPost.blogParentDisplayName) {
		parentBlogName = nativeAdPost.blogParentDisplayName;
	}

	return (
		<PopularPostItem
			key={post.permalink}
			post={post}
			currentBlog={currentBlog}
			parentBlogName={parentBlogName}
			index={0}
			serverSide
			isNativeAd
			isExternalNativeAd={isExternalNativeAd}
		/>
	);
};

export default LeftRailNativeAd;
