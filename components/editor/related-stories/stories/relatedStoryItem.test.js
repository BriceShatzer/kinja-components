import * as React from 'react';
import { mount } from 'enzyme';

import RelatedStoryItem from './relatedStoryItem';
import stubbedPosts from '../../../../__stubs__/stubbedPosts.json';
const post = stubbedPosts.data[1];


describe('<RelatedStoryItem />', () => {
	it('should render properly', () => {
		Math.random = () => 1;
		const wrapper = mount(
			<RelatedStoryItem post={ post } />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
