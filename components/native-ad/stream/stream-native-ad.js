/* @flow */

import * as React from 'react';
import styled from 'styled-components';
import media from 'kinja-components/style-utils/media';
import { CompactCard, StoryCardCompact } from 'kinja-components/components/story-cards-stream';
import AsideTools from 'kinja-components/components/story-cards-stream/aside-tools';
import NativeAd from 'kinja-magma/models/NativeAd';
import Blog from 'kinja-magma/models/Blog';
import User from 'kinja-magma/models/User';
import SimpleImage from 'kinja-magma/models/SimpleImage';
import type { PageType } from 'kinja-magma/models/PageType';
import { createBlogId } from 'kinja-magma/models/Id';
import { isHostInternal, isOnion, isOnionLabs, isStudioAtGizmodo, isCommerce, isRegularEditorial } from '../native-ad-helpers';

export type StreamNativeAdType = {
	post: NativeAd,
	index: number,
	pageType: PageType,
	blog: Blog,
	repostBlog?: Blog,
	parentBlogName?: string,
	revision?: number
};

const NativeAdContainer = styled.div`
	padding-left: ${props => props.theme.columnPadding};

	${media.mediumUp`
		padding-left: ${props => !props.isV2 && props.theme.columnPadding};
		padding-right: ${props => !props.isV2 && `calc(82px + ${props.theme.columnPadding})`};
		padding: ${props => props.isV2 && `0 ${props.theme.columnPadding} 0 calc(66px + ${props.theme.columnPadding})`};
	`}
`;

const StyledAsideTools = styled(AsideTools)`
	display: none;
	${media.mediumUp`
		display: flex;
		position: absolute;
		left: calc(-48px - 18px);
	`}
`;

const setRepostBlog = (nativeAdPost: NativeAd): Blog =>
	Blog.fromJSON({
		id: createBlogId(nativeAdPost.post_blogId || 0),
		name: nativeAdPost.blogDisplayName ? nativeAdPost.blogDisplayName : '',
		displayName: nativeAdPost.blogDisplayName ? nativeAdPost.blogDisplayName : '',
		canonicalHost: nativeAdPost.blogCanonicalHost ? nativeAdPost.blogCanonicalHost : '',
		hosts: nativeAdPost.blogCanonicalHost ? [nativeAdPost.blogCanonicalHost] : [''],
		status: 'ENABLED',
		timezone: 'America/New_York',
		timezoneOffset: -14400000
	});

const setAuthor = (name: string): User =>
	User.fromJSON({
		id: '0',
		screenName: name,
		displayName: name,
		status: 'enabled',
		isSuperuser: false,
		avatar: SimpleImage.fromJSON({ id: '0', format: 'jpg' }),
		createdMillis: 0
	});

const StreamNativeAd = (props: StreamNativeAdType): React$Node => {
	const { post: nativeAdPost, blog, revision, ...rest } = props;
	const isExternalNativeAd =
		(nativeAdPost.postId === '' || nativeAdPost.postId === 0 || nativeAdPost.postId === '0') &&
		!isHostInternal(nativeAdPost.blogCanonicalHost);

	const post = NativeAd.toPost(nativeAdPost);

	// Everything that is from `The Inventory` or `Kinja Deals` should be treated as `Sponsored`
	if (nativeAdPost.blogCanonicalHost && nativeAdPost.blogCanonicalHost.indexOf('theinventory.com') !== -1) {
		post.sponsored = true;
	}

	// Everything that is `Native Ad` is an editorial `Promoted` post
	if (nativeAdPost.postType === 'Native Ad') {
		post.editorial = true;
	}

	const repostBlog = rest.repostBlog ? rest.repostBlog : setRepostBlog(nativeAdPost);

	let authors = [];
	if (
		!isOnion(nativeAdPost) &&
		!isOnionLabs(nativeAdPost) &&
		!isStudioAtGizmodo(nativeAdPost) &&
		!isCommerce(nativeAdPost) &&
		!isRegularEditorial(post) &&
		nativeAdPost.post_authorByline
	) {
		repostBlog.displayName = nativeAdPost.post_authorByline;
		repostBlog.properties = {
			blogGroup: nativeAdPost.blogBlogGroup || nativeAdPost.blogDisplayName || '',
			recircGroup: 'fmgBusiness'
		};
		// Put shortExcerpt in post body so it can be shown
		if (nativeAdPost.post_shortExcerpt) {
			post.nativeExcerpt = nativeAdPost.post_shortExcerpt;
		}
	} else if (isCommerce(nativeAdPost)) {
		repostBlog.properties = {
			blogGroup: nativeAdPost.blogBlogGroup || (nativeAdPost.blogDisplayName || '').replace(/\s/g, '').toLowerCase() || '',
			recircGroup: 'partnerEditorial'
		};
		// Put shortExcerpt in post body so it can be shown
		if (nativeAdPost.post_shortExcerpt) {
			post.nativeExcerpt = nativeAdPost.post_shortExcerpt;
		}
	} else if ((isStudioAtGizmodo(nativeAdPost) || isRegularEditorial(post)) && !isOnion(nativeAdPost) && nativeAdPost.post_authorByline) {
		authors = [setAuthor(nativeAdPost.post_authorByline)];
		repostBlog.properties = {
			recircGroup: isRegularEditorial(post) ? 'fmgNonSatire' : 'fmgBusiness'
		};
	} else if (isOnion(nativeAdPost) || isOnionLabs(nativeAdPost)) {
		repostBlog.displayName = 'The Onion';
		repostBlog.properties = {
			commentsDisabled: true,
			blogGroup: nativeAdPost.blogBlogGroup || nativeAdPost.blogDisplayName || '',
			recircGroup: isOnion(nativeAdPost) ? 'fmgSatire' : 'fmgBusiness'
		};
		blog.properties = {
			...blog.properties,
			commentsDisabled: true
		};
	}

	let parentBlogName;
	if (nativeAdPost.blogParentDisplayName) {
		parentBlogName = nativeAdPost.blogParentDisplayName;
	}

	switch (revision) {
		case 2:
			return (
				<NativeAdContainer isV2>
					<CompactCard
						authors={authors}
						post={post}
						blog={blog}
						repostBlog={repostBlog}
						parentBlogName={parentBlogName}
						isNativeAd
						isV3
						isExternalNativeAd={isExternalNativeAd}
						AsideToolsComponent={StyledAsideTools}
						{...rest}
					/>
				</NativeAdContainer>
			);
		case 1:
			return (
				<NativeAdContainer isV2>
					<CompactCard
						authors={authors}
						post={post}
						blog={blog}
						repostBlog={repostBlog}
						parentBlogName={parentBlogName}
						isNativeAd
						isExternalNativeAd={isExternalNativeAd}
						AsideToolsComponent={StyledAsideTools}
						{...rest}
					/>
				</NativeAdContainer>
			);
		default:
			return (
				<NativeAdContainer>
					<StoryCardCompact
						authors={authors || undefined}
						post={post}
						blog={blog}
						repostBlog={repostBlog}
						parentBlogName={parentBlogName}
						isNativeAd
						isExternalNativeAd={isExternalNativeAd}
						{...rest}
					/>
				</NativeAdContainer>
			);
	}
};

StreamNativeAd.defaultProps = {
	pageType: 'frontpage',
	index: 0,
	revision: 0
};

export default StreamNativeAd;
