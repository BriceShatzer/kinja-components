/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';
import ContentSummary from './content-summary';
import { componentStates } from './__fixtures__/componentStates';

describe('<ContentSummary />', () => {
	it('renders without an image', () => {
		const wrapper = mount(<ContentSummary {...componentStates.storyTypeBoilerplateWithoutImage.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('renders with an image', () => {
		const wrapper = mount(<ContentSummary {...componentStates.storyTypeBoilerplateWithImage.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('renders with previous pagination only', () => {
		const wrapper = mount(<ContentSummary {...componentStates.storyTypeBoilerplateWithImageAndOnlyPrev.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('renders with next and previous pagination', () => {
		const wrapper = mount(<ContentSummary {...componentStates.storyTypeBoilerplateWithImageWithPagination.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});

	it('renders with a non-Standard content type', () => {
		const wrapper = mount(<ContentSummary {...componentStates.storyTypeBoilerplateWithImageWithNonStandardContentType.props} />);
		expect(wrapper.render()).toMatchSnapshot();
	});
});
