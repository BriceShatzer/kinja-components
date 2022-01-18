/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';
import { componentStates } from './__fixtures__';
import VisualTimestamp from './visual-timestamp';

describe('<VisualTimestamp />', () => {
	Object.keys(componentStates).forEach(t => {
		it(componentStates[t].name, () => {
			const wrapper = mount(<VisualTimestamp {...componentStates[t].props} />);
			expect(wrapper.render()).toMatchSnapshot();
		});
	});
});
