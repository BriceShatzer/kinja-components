import * as React from 'react';
import { mount } from 'enzyme';

import ArticleCard from './ArticleCard';

import EmbiggenFilledIcon from '../../icon19/EmbiggenFilled';

import stubbedPosts from '../../../__stubs__/manageBlogPosts.json';

const post = stubbedPosts.data.items[3];
post.vertical = 'io9';
post.replyCount = 607;
const onEmbiggenClick = jest.fn();

export const stubElement = ({ type } = {}) => (
	<ArticleCard
		index={0}
		post={post}
		onEmbiggenClick={onEmbiggenClick}
		type={type}
	/>
);

describe('<ArticleCard />', () => {
	it('should render properly - published', () => {
		const wrapper = mount(stubElement({
			type: 'published'
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should render properly - scheduled', () => {
		const wrapper = mount(stubElement({
			type: 'scheduled'
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should render properly - drafts', () => {
		const wrapper = mount(stubElement({
			type: 'drafts'
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should call onEmbiggenClick', () => {
		const wrapper = mount(stubElement({
			type: 'published'
		}));

		const embiggenIcon = wrapper.find(EmbiggenFilledIcon).at(1);
		embiggenIcon.simulate('click');

		expect(onEmbiggenClick).toBeCalledWith(expect.any(Number), expect.any(Boolean), expect.any(String));
	});
});