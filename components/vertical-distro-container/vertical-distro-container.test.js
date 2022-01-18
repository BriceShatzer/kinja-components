/* @flow */

import * as React from 'react';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { mockProfileApi } from './mocks';
import { VerticalDistroContainerWithoutHOC } from './vertical-distro-container';

describe('<VerticalDistroContainer />', () => {
	it('renders', () => {
		const wrapper = shallow(<VerticalDistroContainerWithoutHOC profileApi={mockProfileApi} blogId={0} />);
		expect(wrapper.instance()).toBeInstanceOf(VerticalDistroContainerWithoutHOC);
	});
});
