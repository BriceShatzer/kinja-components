import * as React from 'react';
import { mount } from 'enzyme';

import PostListContainer, { MessageBox } from './PostListContainer';
import ArticleCard from '../article-card';
import stubbedPosts from '../../../__stubs__/manageBlogPosts.json';


describe('<PostListContainer />', () => {
	const onLoadMoreClick = jest.fn();
	const onEmbiggenClick = jest.fn();

	const stubElement = ({
		children,
		hasMore,
		isLoading,
		status
	} = {}) => (
		<PostListContainer
			hasMore={hasMore}
			isLoading={isLoading}
			onLoadMoreClick={onLoadMoreClick}
			status={status}
		>
			{children}
		</PostListContainer>
	);

	const post = stubbedPosts.data.items[3];
	const article = [<ArticleCard index={0} key='key-0' post={post} onEmbiggenClick={onEmbiggenClick} type='published' />];

	it('should render properly', () => {
		const wrapper = mount(stubElement({
			hasMore: false,
			status: 'published'
		}));

		const messageBox = wrapper.find(MessageBox);

		expect(messageBox).toHaveLength(1);
		expect(wrapper).toMatchSnapshot();
	});

	it('should call the load more callback', () => {
		const wrapper = mount(stubElement({
			children: article,
			hasMore: true,
			status: 'published'
		}));

		const button = wrapper.find('Button');
		button.simulate('click');

		expect(onLoadMoreClick).toHaveBeenCalledTimes(1);
		onLoadMoreClick.mockClear();
	});

	it('should display the <Loading> component', () => {
		const wrapper = mount(stubElement({
			children: article,
			hasMore: true,
			isLoading: true,
			status: 'published'
		}));

		const loading = wrapper.find('Loading');
		expect(loading).toHaveLength(1);
	});
});