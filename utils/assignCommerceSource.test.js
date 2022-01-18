import assignCommerceSource from './assignCommerceSource';

import Post from 'kinja-magma/models/Post';

describe('assignCommerceSource', () => {
	it('uses `nativestream` if not a repost, and on the frontpage', () => {
		const post = Post.fromJSON({
			permalinkHost: 'https://theinventory.com',
			id: 1,
			defaultBlogId: 1,
			repost: null
		});
		expect(assignCommerceSource(post, 'frontpage')).toEqual('nativestream');
	});

	it('uses `streamshare` if a repost, and on the frontpage', () => {
		const post = Post.fromJSON({
			permalinkHost: 'https://theinventory.com',
			id: 1,
			defaultBlogId: 1
		}).clone({
			repost: { id: '2', blogId: '2', postId: '2', authorId: '2' }
		});
		expect(assignCommerceSource(post, 'frontpage')).toEqual('streamshare');
	});

	it('uses `tagpage` if on the tag page', () => {
		const post = Post.fromJSON({
			permalinkHost: 'https://theinventory.com',
			id: 1,
			defaultBlogId: 1
		});
		expect(assignCommerceSource(post, 'tag')).toEqual('tagpage');
	});

	it('uses `storytypepage` if on the storytype/category page', () => {
		const post = Post.fromJSON({
			permalinkHost: 'https://theinventory.com',
			id: 1,
			defaultBlogId: 1
		});
		expect(assignCommerceSource(post, 'sectionedCategoryStream')).toEqual('storytypepage');
		expect(assignCommerceSource(post, 'categoryStream')).toEqual('storytypepage');
	});

	it('uses `searchpage` if on the search page', () => {
		const post = Post.fromJSON({
			permalinkHost: 'https://theinventory.com',
			id: 1,
			defaultBlogId: 1
		});
		expect(assignCommerceSource(post, 'search')).toEqual('searchpage');
	});

	it('uses `specialsection` if on the special section page', () => {
		const post = Post.fromJSON({
			permalinkHost: 'https://theinventory.com',
			id: 1,
			defaultBlogId: 1
		});
		expect(assignCommerceSource(post, 'specialsection')).toEqual('specialsection');
	});
});
