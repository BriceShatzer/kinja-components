import * as React from 'react';
import { mount } from 'enzyme';

import MultipleAuthorsStatic from './multiple-authors-static';

import post from '../../../__stubs__/stubbedPost.json';

describe('<MultipleAuthorsStatic />', () => {
	it('should render properly', () => {
		const wrapper = mount(
			<MultipleAuthorsStatic
				pageType="frontpage"
				authors={post.authors}
				post={post}
			/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should give back byline if byline is set', () => {
		const wrapper = mount(
			<MultipleAuthorsStatic
				authors={post.authors}
				byline="Custom byline"
				post={post}
			/>);
		expect(wrapper.text()).toBe('Custom byline');
	});
});
