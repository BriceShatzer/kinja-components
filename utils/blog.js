/* @flow */

import { BLOGS } from '../config/consts';
import findKey from 'lodash/findKey';

export function getBlogGroupFromBlogId(
	blogId: string,
	blogs: {[id: string]: number} = BLOGS,
	findFn: (blogs: {[id: string]: number}, predicate: (id: number) => boolean) => string | void = findKey
) {
	return findFn(blogs, id => Number(id) === Number(blogId));
}

export const isStudioAtGizmodo = (id: mixed) => String(id) === String(BLOGS.studioatgizmodo);
export const isOnionLabs = (id: mixed) => String(id) === String(BLOGS.onionlabs);
