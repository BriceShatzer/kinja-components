import * as React from 'react';
import {
	mount
} from 'enzyme';

import RelatedStoryList from './relatedStoryList';
import * as stubbedPosts from './../stubs/storysuggestions.json';

describe('<RelatedStoryList />', () => {
	it('should render properly', () => {
		// override the random generator for snapshots so the keys arent different every time you run the test
		Math.random = () => 1;
		const stories = [[stubbedPosts.data.items[0], stubbedPosts.data.items[3]]];
		const wrapper = mount(
			<RelatedStoryList stories={ stories } />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
