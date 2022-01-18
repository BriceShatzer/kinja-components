import * as React from 'react';

import { shallow } from 'enzyme';

import FloatingToolbar from './floating-toolbar';
import ToolbarItem from '../toolbar-item';

const noop = () => {};

describe('Floating toolbar', () => {
	it('should render a list', () => {
		const wrapper = shallow(<FloatingToolbar>
			<ToolbarItem title="Test" icon="test" onClick={noop} />
		</FloatingToolbar>);
		expect(wrapper).toMatchSnapshot();
	});
});
