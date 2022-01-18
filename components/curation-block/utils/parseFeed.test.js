// @flow

import parseFeed from './parseFeed';

jest.mock('kinja-magma/api/profile', () => ({
	blogByHost: (str: string) => {
		return str === 'nonkinja.com' ? Promise.reject() : Promise.resolve({
			id: '4'
		});
	}
}));

jest.mock('kinja-magma/api/categorization', () => ({
	getStoryType: ({ blogId, storyType }: { blogId: string, storyType: string }) => {
		return !blogId || !storyType || storyType === 'nonexistent' ? Promise.reject() : Promise.resolve({
			id: '14'
		});
	},
	getCategory: ({ blogId, storyType, category, parent }: { blogId: string, storyType: string, category: string, parent?: string }) => {
		if (!blogId || !storyType || !category || category === 'nonexistent') {
			return Promise.reject();
		}
		if (parent === 'nonexistent') {
			return Promise.reject();
		}
		const categoryId = parent ? '34' : '24';
		return Promise.resolve({
			id: categoryId
		});
	}
}));

describe('CuratedHomepageEditor - parseFeed', () => {
	it('should parse blog', done => {
		Promise.all(['https://gizmodo.com/', 'https://test.gizmodo.com'].map(str => parseFeed(str))).then(results => {
			results.forEach(result => expect(result).toEqual({
				type: 'BlogAutofill',
				blogId: '4'
			}));
			done();
		})
			.catch(err => fail(err));
	});
	it('should return null on invalid urls', done => {
		Promise.all(['gizmodo.com', 'test.gizmodo.com', 'invalid'].map(str => parseFeed(str))).then(results => {
			results.forEach(result => {
				expect(result).toEqual(null);
			});
			done();
		})
			.catch(err => fail(err));
	});
	it('should return null on non-kinja blogs', done => {
		parseFeed('https://nonkinja.com/').then(result => {
			expect(result).toEqual(null);
			done();
		})
			.catch(err => fail(err));
	});
	it('should parse tag', done => {
		Promise.all(['https://gizmodo.com/tag/foo', 'https://test.gizmodo.com/tag/foo/'].map(str => parseFeed(str))).then(results => {
			results.forEach(result => {
				expect(result).toEqual({
					type: 'TagAutofill',
					blogId: '4',
					tagCanonical: 'foo'
				});
			});
			done();
		})
			.catch(err => fail(err));
	});
	it('should return null for missing tagnames', done => {
		parseFeed('https://test.gizmodo.com/tag/').then(result => {
			expect(result).toEqual(null);
			done();
		})
			.catch(err => fail(err));
	});
	it('should parse storytype', done => {
		Promise.all(['https://gizmodo.com/c/foo', 'https://test.gizmodo.com/c/foo/'].map(str => parseFeed(str))).then(results => {
			results.forEach(result => {
				expect(result).toEqual({
					type: 'StoryTypeAutofill',
					storyTypeId: '14'
				});
				done();
			});
		})
			.catch(err => fail(err));
	});
	it('should parse category', done => {
		Promise.all(['https://gizmodo.com/c/foo/bar', 'https://test.gizmodo.com/c/foo/bar/'].map(str => parseFeed(str))).then(results => {
			results.forEach(result => {
				expect(result).toEqual({
					type: 'CategoryAutofill',
					categoryId: '24'
				});
				done();
			});
		})
			.catch(err => fail(err));
	});
	it('should parse subcategory', done => {
		Promise.all(['https://gizmodo.com/c/foo/bar/baz', 'https://test.gizmodo.com/c/foo/bar/baz/'].map(str => parseFeed(str))).then(results => {
			results.forEach(result => {
				expect(result).toEqual({
					type: 'CategoryAutofill',
					categoryId: '34'
				});
				done();
			});
		})
			.catch(err => fail(err));
	});
});