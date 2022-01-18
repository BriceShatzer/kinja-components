import * as React from 'react';
import { shallow } from 'enzyme';

import PostList, { Divider, Title } from './post-list';
import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';

import posts from 'kinja-components/__stubs__/postObjects.json';
import TheOnion from 'kinja-components/__stubs__/stubbedBlog.2.json';


describe('<PostList />', () => {
	const onDividerClick = jest.fn();
	const onMoreStoriesClick = jest.fn();

	const stubElement = ({
		isLoading = false,
		hasMoreResults = true,
		hasResults = true,
		numberOfResults = 100,
		storiesFrom = ['The Onion']
	} = {}) => (
		<PostList
			blog={Blog.fromJSON(TheOnion)}
			isLoading={isLoading}
			networkBlogs={[]}
			searchTerms={'hi!'}
			currentBlog="theonion"
			hasMoreResults={hasMoreResults}
			dividerIndex={6}
			hasResults={hasResults}
			networkName="G/O Media"
			numberOfResults={numberOfResults}
			onDividerClick={onDividerClick}
			onMoreStoriesClick={onMoreStoriesClick}
			pageType="search"
			posts={posts.items.slice(0, 10).map(post => Post.fromJSON(post))}
			storiesFrom={storiesFrom}
			simpleEmbiggen
		/>
	);

	it('should render', () => {
		const postList = shallow(stubElement());
		expect(postList).toMatchSnapshot();
	});

	it('should display Loading component', () => {
		const postList = shallow(stubElement({ isLoading: true }));
		const loading = postList.find('Loading');
		expect(loading).toHaveLength(1);
	});

	it('should not display More stories Button', () => {
		const postList = shallow(stubElement({ hasMoreResults: false }));
		const moreStoriesButton = postList.find({ label: 'More stories' });
		expect(moreStoriesButton).toHaveLength(0);
	});

	it('should call callbacks', () => {
		const postList = shallow(stubElement());
		const divider = postList.find(Divider);
		divider.simulate('click');
		expect(onDividerClick).toHaveBeenCalledTimes(1);

		const moreStoriesButton = postList.find({ label: 'More stories' });
		moreStoriesButton.simulate('click');
		expect(onMoreStoriesClick).toHaveBeenCalledTimes(1);

		jest.clearAllMocks();
	});

	it('should write out Title properly', () => {
		const postList = shallow(stubElement());
		const title = postList.find(Title);

		expect(title.text()).toBe('More Recent Stories from The Onion');
	});
});