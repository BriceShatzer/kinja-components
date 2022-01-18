import * as React from 'react';
import { mount } from 'enzyme';

import ManualStoryItem from './manualStoryItem';

const pasteUrl = input => {
	input.simulate('focus');
	input.simulate('change', {
		target: {
			value: 'http://www.google.com'
		}
	});
};

describe('<ManualStoryItem />', () => {
	it('should render properly', () => {
		const handler = jest.fn();
		const wrapper = mount(
			<ManualStoryItem onChange={handler} isEditMode={ true } />
		);
		const input = wrapper.find('input');
		pasteUrl(input);

		expect(wrapper).toMatchSnapshot();
	});
});
