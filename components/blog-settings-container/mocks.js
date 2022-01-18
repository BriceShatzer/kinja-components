// this is a real blogProperties response - want to make sure the component is appropriately
// whitelisting the properties and only returning the relevant ones.
const returnedBlogProperties = [
	{ id: 20387, blogId: 1636027099, key: 'hideViewcounts', value: true },
	{ id: 20443, blogId: 1636027099, key: 'instagramScreenName', value: 'theavc' },
	{ id: 20352, blogId: 1636027099, key: 'isGmgBlog', value: true },
	{ id: 20480, blogId: 1636027099, key: 'logoLink', value: 'https://x.kinja-static.com/assets/images/logos/newsletter/avclub-500px.png' },
	{ id: 22005, blogId: 1636027099, key: 'mainColor', value: '#1c263c' },
	{ id: 20949, blogId: 1636027099, key: 'navigationGroup', value: 'fmg' },
	{ id: 20400, blogId: 1636027099, key: 'newsletter', value: true },
	{ id: 19641, blogId: 1636027099, key: 'noindex', value: false },
	{ id: 21856, blogId: 1636027099, key: 'numberOfInfiniteScrollArticles', value: 10 },
	{ id: 20413, blogId: 1636027099, key: 'promotionUnit', value: 'fmg.avclub' },
	{ id: 19640, blogId: 1636027099, key: 'robotsAllowed', value: true },
	{ id: 20476, blogId: 1636027099, key: 'singleOptIn', value: true },
	{ id: 21047, blogId: 1636027099, key: 'skimLinkId', value: '33330X1569324' },
	{ id: 20442, blogId: 1636027099, key: 'twitterScreenName', value: 'theavclub' },
	{ id: 20444, blogId: 1636027099, key: 'youtubeUrl', value: 'https://www.youtube.com/user/theavclub' }
];

const mockProfileApi = {
	createBlogProperty: jest.fn(() =>
		Promise.resolve({
			key: 'hideViewCounts',
			value: true,
			id: 1,
			blogId: 1
		})),
	updateBlogProperty: jest.fn(() =>
		Promise.resolve({
			key: 'hideViewCounts',
			value: true,
			id: 99,
			blogId: 1
		})),
	getBlogProperties: jest.fn(() => Promise.resolve(returnedBlogProperties))
};

export const mockProps = {
	profileApi: mockProfileApi,
	blogProperties: [],
	currentBlogId: 1636027099
};
