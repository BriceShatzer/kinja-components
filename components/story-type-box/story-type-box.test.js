/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import StoryTypeBox from './story-type-box';

import { componentStates } from './__fixtures__/componentStates';

describe('<StoryTypeBox />', () => {

	it('should render as a box with title and description only', () => {
		const wrapper = mount(<StoryTypeBox {...componentStates.textOnly.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('should render as a box with title, description and image', () => {
		const wrapper = mount(<StoryTypeBox {...componentStates.textAndImage.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('should render as a box with title and image only', () => {
		const wrapper = mount(<StoryTypeBox {...componentStates.titleAndImage.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('should not render as a box, with title and category label only', () => {
		const wrapper = mount(<StoryTypeBox {...componentStates.titleAndCategoryLabel.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

});
