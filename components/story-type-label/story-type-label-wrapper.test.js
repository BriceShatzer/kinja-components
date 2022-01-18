import * as React from 'react';
import { mount } from 'enzyme';

import StoryTypeLabelWrapper, { MARGIN_VALUES } from './story-type-label-wrapper';
import StoryTypeLabel from './story-type-label';

describe('<StoryTypeLabelWrapper />', () => {
	it('should render by default', () => {
		const wrapper = mount(
			<StoryTypeLabelWrapper>
				<StoryTypeLabel label="Review" />
			</StoryTypeLabelWrapper>
		);
		expect(wrapper.render()).toMatchSnapshot();
	});

	Object.keys(MARGIN_VALUES).forEach(margin => {
		it(`should render with ${margin} margin`, () => {
			const wrapper = mount(
				<StoryTypeLabelWrapper margin={margin}>
					<StoryTypeLabel label="Review" />
				</StoryTypeLabelWrapper>
			);
			expect(wrapper.render()).toMatchSnapshot();
		});
	});

});
