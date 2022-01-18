/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import ImpactNav from './impact-nav';

const stubbedProps = {
	blogName: 'Kotaku',
	hide: false,
	href: ''
};

describe('<ImpactNav />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<ImpactNav {...stubbedProps} />);
		expect(wrapper.dive()).toMatchSnapshot();
	});
});
