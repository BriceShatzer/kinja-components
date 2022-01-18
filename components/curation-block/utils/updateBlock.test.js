// @flow

import updateBlock from './updateBlock';
import Post from 'kinja-magma/models/Post';
import { createBlogId, createPostId } from 'kinja-magma/models/Id';
import { CurationStandardBlock } from 'kinja-magma/models/CurationBlock';
import getCurationBlockData from 'kinja-magma/controllers/front-page/getCurationBlockData';
import type { ResolvedCurationBlockList } from 'kinja-magma/controllers/front-page/getCurationBlockData';
import type { State } from '../reducer';

import stubbedPost from '../../../__stubs__/stubbedPost.json';
import stubbedPost2 from '../../../__stubs__/stubbedPost.2.json';
import stubbedPost3 from '../../../__stubs__/stubbedPost.3.json';
import stubbedPost4 from '../../../__stubs__/stubbedPost.4.json';
import stubbedPost5 from '../../../__stubs__/stubbedPost.5.json';

const postIds = [
	createPostId('1819856086'),
	createPostId('1819653457'),
	createPostId('1820641267'),
	createPostId('1798252300'),
	createPostId('1820948143')
];


const block = new CurationStandardBlock({
	id: '000',
	type: 'Standard',
	layout: { type: 'FourCardModular' },
	cards: [null, null, null, null]
});

const posts = [
	Post.fromJSON(stubbedPost),
	Post.fromJSON(stubbedPost2),
	Post.fromJSON(stubbedPost3),
	Post.fromJSON(stubbedPost4),
	Post.fromJSON(stubbedPost5)
];

const cache: ResolvedCurationBlockList = {
	curationBlocks: [block],
	posts: [],
	authors: {},
	videos: [],
	postCategorization: [],
	autofillIdsByBlock: { '000': [] }
};

const state: State = {
	editStack: [[block]],
	selectedCardIndex: null,
	selectedBlockIndex: null,
	undoPointer: null,
	cache,
	cardErrors: {},
	loadingCards: [],
	loadingBlocks: [],
	editMode: 'BlockEditing',
	cardIsDragging: false,
	lastEditActionTimestamp: null,
	closedConcurrentEditingWarningLevel: null
};


describe('UpdateBlock', () => {
	it('should update immediately if no autofill is given', () => {
		const dispatch = jest.fn();
		const blockIndex = 0;
		const newBlock = { layout: { type: 'FiveCardModular' }, blockType: 'Standard' };
		updateBlock({ blockIndex, newBlock, blogId: createBlogId('1'), state, dispatch, useVideoPlaylist: false, onError: () => {} });

		expect(dispatch).toHaveBeenCalledWith({ type: 'UpdateBlockAction', blockIndex, newBlock, newCache: cache  });
	});

	it('should update if posts are fetched for autofill', async done => {
		const dispatch = jest.fn();
		const blockIndex = 0;
		const newBlock = {
			layout: { type: 'FiveCardModular' },
			blockType: 'Standard',
			autofill: { type: 'BlogAutofill', blogId: createBlogId('1') }
		};

		const blockWithPosts = new CurationStandardBlock({
			id: '000',
			type: 'Standard',
			layout: { type: 'FourCardModular' },
			cards: postIds.slice(1).map(postId => ({ postId }))
		});

		getCurationBlockData.resolveCurationBlocks = jest.fn(() => {
			return Promise.resolve({
				curationBlocks: [blockWithPosts],
				posts,
				authors: {},
				videos: [],
				postCategorization: [],
				autofillIdsByBlock: {  '000': postIds  }
			});
		});

		await updateBlock({ blockIndex, newBlock, blogId: createBlogId('1'), state, dispatch, useVideoPlaylist: true, onError: () => {} });

		expect(dispatch).toHaveBeenNthCalledWith(2, {
			type: 'UpdateBlockAction',
			blockIndex,
			newBlock,
			newCache: {
				curationBlocks: [blockWithPosts],
				posts,
				authors: {},
				videos: [],
				postCategorization: [],
				autofillIdsByBlock: {  '000': postIds  }
			}
		});
		done();
	});
});

