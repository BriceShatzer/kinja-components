// @flow

import type { ResolvedCurationBlockList } from 'kinja-magma/controllers/front-page/getCurationBlockData';
import type { PostId } from 'kinja-magma/models/Id';
import { createPostId } from 'kinja-magma/models/Id';
import { getPost } from 'kinja-magma/api/core';
import { forUrls } from 'kinja-magma/api/links';
import { categorizePosts } from 'kinja-magma/api/categorization';

function getDataForPost(cache: ResolvedCurationBlockList, postId: PostId): Promise<ResolvedCurationBlockList> {
	const postPromise = cache.posts.find(post => post.id === postId) ? Promise.resolve(null) : getPost(postId);
	const postCategorizationPromise = cache.postCategorization.find(post => post.post === postId) ? Promise.resolve(null) : categorizePosts([postId]);
	return Promise.all([
		postPromise,
		postCategorizationPromise
	])
		.then(([post, postCategorization]) => ({
			...cache,
			posts: post ? cache.posts.concat([post]) : cache.posts,
			postCategorization: postCategorization && postCategorization.length ? cache.postCategorization.concat(postCategorization) : cache.postCategorization
		}));
}

function getDataForUrl(cache: ResolvedCurationBlockList, url: string): Promise<[PostId, ResolvedCurationBlockList] | null> {
	return forUrls(url)
		.then(response => {
			if (response.length > 0) {
				const link = response[0];
				if (link.provider !== 'kinja') {
					return null;
				}
				const postId = createPostId(link.meta.postId);
				return getDataForPost(cache, postId).then(newCache => [postId, newCache]);
			}
			return null;
		});
}

export default {
	getDataForPost,
	getDataForUrl
};
