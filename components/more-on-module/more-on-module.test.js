import React from 'react';
import { shallow } from 'enzyme';

import MoreOnModule from './more-on-module';
import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';

import posts from 'kinja-components/__stubs__/stubbedPosts.json';
import blog from 'kinja-components/__stubs__/gizmodo.json';


describe('MoreOnModule', () => {
	it('should render properly ', () => {
		const wrapper = shallow(
			<MoreOnModule
				blog={Blog.fromJSON(blog)}
				posts={posts.data.slice(0, 4).map(post => Post.fromJSON(post))}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});
});
