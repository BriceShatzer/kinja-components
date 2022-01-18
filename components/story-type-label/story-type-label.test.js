import * as React from 'react';
import { mount } from 'enzyme';

import StoryTypeLabel from './story-type-label';

describe('<StoryTypeLabel />', () => {
	it('should render by default', () => {
		const wrapper = mount(<StoryTypeLabel tag="Reviews" />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('should render outlined', () => {
		const wrapper = mount(<StoryTypeLabel tag="Reviews" outlined />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('should render featured', () => {
		const wrapper = mount(<StoryTypeLabel tag="Reviews" featured />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('should render outlined featured', () => {
		const wrapper = mount(<StoryTypeLabel tag="Reviews" outlined featured />);
		expect(wrapper.render()).toMatchSnapshot();
	});
});
