import * as React from 'react';
import { mount } from 'enzyme';
import { noop } from 'lodash/noop';

import ButtonGroup from './ButtonGroup';
import ButtonGroupItem from './ButtonGroupItem';


const buttonGroup = (
	<ButtonGroup small onChange={noop}>
		<ButtonGroupItem label="Big Red Button" selected />
		<ButtonGroupItem label="Yellow Button" />
	</ButtonGroup>
);

describe('<ButtonGroup />', () => {
	it('should have children', () => {
		expect(mount(buttonGroup)).toMatchSnapshot();
	});
});
