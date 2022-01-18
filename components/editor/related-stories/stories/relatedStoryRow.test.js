import * as React from 'react';
import { mount } from 'enzyme';

import RelatedStoryRow from './relatedStoryRow';
import * as stubbedPosts from './../stubs/storysuggestions.json';

describe('<RelatedStoryRow />', () => {
	it('should render properly', () => {
		const stories = [stubbedPosts.data.items[0], stubbedPosts.data.items[3]];
		// override the random generator for snapshots so the keys arent different every time you run the test
		Math.random = () => 1;
		const wrapper = mount(<RelatedStoryRow stories={stories} />);
		expect(wrapper).toMatchSnapshot();
	});
});
