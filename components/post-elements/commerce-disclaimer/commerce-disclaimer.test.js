import * as React from 'react';
import { mount } from 'enzyme';
import CommerceDisclaimer from './commerce-disclaimer';

describe('<CommerceDisclaimer />', () => {
	it('should render with default props', () => {
		const wrapper = mount(<CommerceDisclaimer />);
		expect(wrapper.render()).toMatchSnapshot();
	});
});