import * as React from 'react';
import { mount } from 'enzyme';

import StoryRowControls from './storyRowControls';


describe('<StoryRowControls />', () => {
	it('should render properly', () => {
		const wrapper = mount(
			<StoryRowControls currentCount={1} index={1} maxRows={1} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
