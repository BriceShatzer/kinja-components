/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import {{COMPONENT_NAME}} from './{{COMPONENT_FILENAME}}';

describe('<{{COMPONENT_NAME}} />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<{{COMPONENT_NAME}} />);
		expect(wrapper).toMatchSnapshot();
	});
});
