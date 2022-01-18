/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import EnvSwitch from './env-switch';
import Button19 from '../button19';

describe('<EnvSwitch />', () => {
	it('should render', () => {
		const component = shallow(<EnvSwitch />);
		expect(component).toMatchSnapshot();
	});

	it('should have a toggle button', () => {
		const component = shallow(<EnvSwitch />);
		expect(component.find(Button19)).toHaveLength(1);
	});
});
