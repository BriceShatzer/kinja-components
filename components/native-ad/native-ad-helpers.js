/* @flow */

import { BLOGS } from 'kinja-components/config/consts';
import NativeAd from 'kinja-magma/models/NativeAd';
import Post from 'kinja-magma/models/Post';
import SidebarPost from 'kinja-magma/models/SidebarPost';

const internalHosts = ['kinjadeals.theinventory.com', 'theinventory.com'];

export const isHostInternal = (canonicalHost: ?string) => {
	// Technically a simple regex for theinventory should suffice
	//  but this should allow us to easily add more override hosts if needed
	if (canonicalHost) {
		return internalHosts.indexOf(canonicalHost) > -1;
	} else {
		return false;
	}
};

export const isOnion = (post: NativeAd) => post.post_blogId === String(BLOGS.theonion);
export const isOnionLabs = (post: NativeAd) => post.post_blogId === String(BLOGS.onionlabs);
export const isStudioAtGizmodo = (post: NativeAd) => post.post_blogId === String(BLOGS.studioatgizmodo);
export const isCommerce = (post: NativeAd) => internalHosts.indexOf(post.blogCanonicalHost) > -1;
export const isRegularEditorial = (post: Post | SidebarPost) => post.sponsored === false && post.editorial === true;
export const isPaidEditorial = (post: Post) => post.sponsored === true && post.editorial === true;
