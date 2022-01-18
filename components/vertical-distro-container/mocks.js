// @flow

import type { BlogProperty, Blog } from '../types';

import gizmodo from '../../__stubs__/gizmodo.json';
import theonion from '../../__stubs__/stubbedBlog.2.json';

export const verticals: Array<Blog> = [gizmodo, theonion];
export const mockBlogProp: BlogProperty = {
	key: 'hideViewCounts',
	value: true,
	id: 1,
	blogId: 1
};

export const mockProfileApi = {
	createBlogProperty: () => Promise.resolve(mockBlogProp),
	updateBlogProperty: () => Promise.resolve(mockBlogProp),
	getBlogProperties: () => Promise.resolve([mockBlogProp]),
	getIdsOfVerticals: () => Promise.resolve([0]),
	getBlogs: () => Promise.resolve(verticals)
};
