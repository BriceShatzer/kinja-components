/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import MembershipItem from './membership-item';

describe('<MembershipItem />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<MembershipItem name={'deadspin'} />);
		expect(wrapper).toMatchSnapshot();
	});
});
