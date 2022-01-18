import defaultLayouts from '../curation-layout/default-layouts-stub';
import post5 from '../../__stubs__/stubbedPost.5.json';
const currentBlogMock = {
	id: 9,
	canonicalHost: 'gizmodo.com',
	blogGroup: 'gizmodo'
};

function resolveItemMock() {
	return Promise.resolve(post5);
}

function uploadControllerMock(x) {
	return Promise.resolve(x);
}
const curationProps = () => ({
	curationToolbarProps: {
		saveHandler: () => {}
	},
	layoutProps: {
		defaultLayouts,
		gridConfig: {},
		externalAPI: {
			imageUploader: uploadControllerMock,
			resolveItem: resolveItemMock,
			saveLayoutAndItems: () => {},
			currentBlog: currentBlogMock
		}
	}
});

export default curationProps;
