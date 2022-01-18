/* eslint-disable flowtype/no-types-missing-file-annotation */

import { getBlogGroupFromBlogId } from './blog';
import type { Post } from '../components/types';

export function getPostBlogGroupFromPost(post: Post) {
	const { defaultBlogId,
		defaultBlog,
		blogGroup
	} = post;

	let postBlogGroup;

	if (blogGroup) {
		postBlogGroup = blogGroup;
	} else if (defaultBlog && defaultBlog.properties) {
		postBlogGroup = defaultBlog.properties.blogGroup;
	} else if (defaultBlogId) {
		postBlogGroup = getBlogGroupFromBlogId(defaultBlogId);
	} else {
		postBlogGroup = 'kinja';
	}

	return postBlogGroup;
}
