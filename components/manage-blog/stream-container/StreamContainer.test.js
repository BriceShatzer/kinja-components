import * as React from 'react';
import { mount } from 'enzyme';

import StreamContainer from './StreamContainer';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';

import stream from '../../../__stubs__/stubbedStream.json';
import blog from '../../../__stubs__/gizmodo.json';
import stubbedPosts from '../../../__stubs__/manageBlogPosts.json';


jest.mock('shortid', () => ({ count: 0, generate() { return `shortkey-${++this.count}`; }}));

const authors = [{
	avatar: {
		id: '18mk8augnk3a5jpg',
		format: 'jpg'
	},
	displayName: 'Matt Novak',
	id: '489539437',
	screenName: 'mattnovak',
	isSuperuser: false
}];
const publishTimeMillis = 1542810431830;

const storyObject = {
	authors,
	publishTimeMillis,
	status: 'scheduled'
};
const post_1 = Post.fromJSON(Object.assign({}, stubbedPosts.data.items[3], storyObject));
const post_2 = Post.fromJSON(Object.assign({}, stubbedPosts.data.items[5], storyObject));
const postList = [post_1, post_2];

const stubElement = ({
	hasActivePromotions,
	isLoading,
	hasMore,
	onEmbiggenClick,
	onLoadMoreClick,
	posts
} = {}) => (
	<StreamContainer
		hasActivePromotions={hasActivePromotions}
		blog={Blog.fromJSON(blog)}
		hasMore={hasMore}
		isLoading={isLoading}
		onEmbiggenClick={onEmbiggenClick}
		onLoadMoreClick={onLoadMoreClick}
		posts={posts}
		scheduledPosts={postList}
	/>
);

const getPosts = quantity => {
	return stream.items.slice(0, quantity).map(_ => Post.fromJSON(_.post));
};

describe('<StreamContainer />', () => {
	it('should render properly', () => {
		const wrapper = mount(stubElement({
			posts: getPosts(1)
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should not render scheduled post', () => {
		const wrapper = mount(stubElement({
			posts: getPosts(1)
		}));
		wrapper.setState({ showScheduledPosts: false });

		const feedItems = wrapper.find('FeedItem').length;
		const splices = wrapper.find('Splice').length;
		const numberOfPostElements = feedItems + splices;

		expect(numberOfPostElements).toEqual(1);
	});

	it('should render scheduled post', () => {
		const wrapper = mount(stubElement({
			posts: getPosts(1)
		}));
		wrapper.setState({ showScheduledPosts: true });

		const feedItems = wrapper.find('FeedItem').length;
		const splices = wrapper.find('Splice').length;
		const numberOfPostElements = feedItems + splices;

		expect(numberOfPostElements).toEqual(1 + postList.length);
	});

	it('should render one promoted splice', () => {
		const wrapper = mount(stubElement({
			hasActivePromotions: true,
			posts: getPosts(3)
		}));
		const promotedSplices = wrapper.find('PromotedSplice');

		expect(promotedSplices).toHaveLength(1);
	});

	it('should not render promoted splices', () => {
		const wrapper = mount(stubElement({
			hasActivePromotions: false,
			posts: getPosts(3)
		}));
		const promotedSplices = wrapper.find('PromotedSplice');

		expect(promotedSplices).toHaveLength(0);
	});

	it('should call the `onLoadMoreClick` callback', () => {
		const onLoadMoreClick = jest.fn();
		const wrapper = mount(stubElement({
			hasMore: true,
			onLoadMoreClick,
			posts: getPosts(1)
		}));

		const button = wrapper.find('Button');
		button.simulate('click');

		expect(onLoadMoreClick).toBeCalled();
		onLoadMoreClick.mockClear();
	});

	it('should call `onEmbiggenClick` callback', () => {
		const onEmbiggenClick = jest.fn();
		const wrapper = mount(stubElement({
			onEmbiggenClick,
			posts: getPosts(1)
		}));

		const firstFeedItemWrapper = wrapper.find('FeedItemWrapper').at(0);
		const embiggenButton = firstFeedItemWrapper.find('EmbiggenFilledIcon').at(1);
		embiggenButton.simulate('click');

		// onEmbiggenClick(postId, !isEmbiggened)
		expect(onEmbiggenClick).toBeCalledWith(expect.any(String), expect.any(Boolean), expect.any(String));
		onEmbiggenClick.mockClear();
	});

	it('should display the `Loading` element', () => {
		const wrapper = mount(stubElement({
			hasMore: true,
			isLoading: true,
			posts: getPosts(1)
		}));

		expect(wrapper.exists('Loading')).toEqual(true);
	});
});