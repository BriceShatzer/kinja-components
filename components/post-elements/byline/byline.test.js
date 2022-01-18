// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';
import User from 'kinja-magma/models/User';

import Byline, { MultipleAuthorsContainer } from './byline';

import postJSON from '../../../__stubs__/stubbedPost.json';
import blogJSON from '../../../__stubs__/gizmodo.json';

// Mock the time
jest.mock('../../../utils/DateTime', () => {
	return jest.fn().mockImplementation(() => {
		return {
			machineDateTime: 'Fake Date',
			relativeDateTime: 'Fake Time'
		};
	});
});

describe('<Byline />', () => {
	let user1;
	let user2;

	beforeAll(() => {
		const userJSON = { status: 'enabled', isSuperuser: false, avatar: { id: 'qqrex4g4qmpkf67wwrcu', format: 'jpg' }, createdMillis: 0 };
		user1 = User.fromJSON({ id: '1', screenName: 'speculum', displayName: 'Looking Glass', ...userJSON });
		user2 = User.fromJSON({ id: '2', screenName: 'necdivinos', displayName: 'Baba Yaga', ...userJSON });
	});

	it('should render multiple authors and meta time', () => {
		const wrapper = mount(
			<Byline
				authors={[user1, user2]}
				pageType={'frontpage'}
				post={Post.fromJSON(postJSON)}
				index={1}
			/>
		);
		expect(wrapper).toMatchSnapshot();
	});

	describe('should not render author', () => {

		it('when there are no authors', () => {
			const wrapper = shallow(
				<Byline
					pageType={'frontpage'}
					post={Post.fromJSON(postJSON)}
					index={1}
				/>
			);

			expect(wrapper.find(MultipleAuthorsContainer).exists()).toBe(false);
		});

		it('when parent blog has the hideAuthorInfo set to true', () => {
			const properties = {...blogJSON.properties, hideAuthorInfo: true};
			const blog = Blog.fromJSON({...blogJSON, properties});

			const wrapper = shallow(
				<Byline
					authors={[user1]}
					pageType={'frontpage'}
					post={Post.fromJSON(postJSON)}
					blog={blog}
					index={1}
				/>
			);

			expect(wrapper.find(MultipleAuthorsContainer).exists()).toBe(false);
		});

		it('when repost blog has the hideAuthorInfo set to true', () => {
			const properties = {...blogJSON.properties, hideAuthorInfo: true};
			const blog = Blog.fromJSON({...blogJSON, properties});

			const wrapper = shallow(
				<Byline
					authors={[user1]}
					pageType={'frontpage'}
					post={Post.fromJSON(postJSON)}
					repostBlog={blog}
					index={1}
				/>
			);

			expect(wrapper.find(MultipleAuthorsContainer).exists()).toBe(false);
		});

	});

	describe('should show byline', () => {

		it('when parent blog has the hideAuthorInfo set to false', () => {
			const properties = {...blogJSON.properties, hideAuthorInfo: false};
			const blog = Blog.fromJSON({...blogJSON, properties});

			const wrapper = shallow(
				<Byline
					authors={[user1]}
					pageType={'frontpage'}
					post={Post.fromJSON(postJSON)}
					blog={blog}
					index={1}
				/>
			);

			expect(wrapper.find(MultipleAuthorsContainer).exists()).toBe(true);
		});

		it('when the parent blog has the hideAuthorInfo set to true but the repost has not', () => {
			const blog = Blog.fromJSON({...blogJSON, properties: {...blogJSON.properties, hideAuthorInfo: true}});
			const repostBlog = Blog.fromJSON({...blogJSON, properties: {...blogJSON.properties, hideAuthorInfo: false}});

			const wrapper = shallow(
				<Byline
					authors={[user1]}
					pageType={'frontpage'}
					post={Post.fromJSON(postJSON)}
					blog={blog}
					repostBlog={repostBlog}
					index={1}
				/>
			);

			expect(wrapper.find(MultipleAuthorsContainer).exists()).toBe(true);
		});

	});
});
