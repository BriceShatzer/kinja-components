// @flow

import addPost from './addPost';
import Post from 'kinja-magma/models/Post';
import { createPostId } from 'kinja-magma/models/Id';
import stubbedPost from 'kinja-components/__stubs__/stubbedPost.json';
import dataStore from '../data-store';

const cache = {
	curationBlocks: [],
	posts: [],
	authors: {},
	videos: [],
	postCategorization: [],
	autofillIdsByBlock: {}
};

describe('Add post', () => {
	it('should show error message if url is not valid url', () => {
		const dispatch = jest.fn();
		const url = 'almafa';
		addPost({ pos: [0, 0], url, cache, dispatch, ga: () => {} });
		expect(dispatch).toHaveBeenCalledWith({ type: 'CardErrorAction', pos: [0, 0], error: 'Invalid url' });
	});

	it('should show error message if url is not valid kinja url', async done => {
		const dispatch = jest.fn();
		const url = 'almafa.com';

		dataStore.getDataForUrl = jest.fn(() => {
			return Promise.resolve(null);
		});

		await addPost({ pos: [0, 0], url, cache, dispatch, ga: () => {} });
		expect(dispatch).toHaveBeenNthCalledWith(4, { type: 'CardErrorAction', pos: [0, 0], error: 'Only valid kinja urls are allowed.' });
		done();
	});

	it('should add post for the given url', async done => {
		const dispatch = jest.fn();
		const url = 'kinja.com/awesome-post';

		dataStore.getDataForUrl = jest.fn(() => Promise.resolve([createPostId(1819856086), { ...cache, posts: [Post.fromJSON(stubbedPost)] }]));

		await addPost({ pos: [0, 0], url, cache, dispatch, ga: () => {} });

		expect(dispatch).toHaveBeenNthCalledWith(4, {
			type: 'AddPostAction',
			pos: [0, 0],
			postId: createPostId(1819856086),
			newCache: { ...cache, posts: [Post.fromJSON(stubbedPost)] }
		});
		done();
	});
});