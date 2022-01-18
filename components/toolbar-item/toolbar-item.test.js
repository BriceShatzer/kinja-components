import * as React from 'react';

import { shallow } from 'enzyme';

import ToolbarItem from './toolbar-item';

const noop = () => {};

describe('Items', () => {
	it('should show their icon', () => {
		const wrapper = shallow(<ToolbarItem title="Test" icon="test" onClick={noop} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should trigger onClick handler', () => {
		const handler = jest.fn();
		const wrapper = shallow(<ToolbarItem title="Test" icon="test" onClick={handler} />);
		wrapper.find('toolbar-item__ToolbarLink').simulate('click');
		expect(handler).toHaveBeenCalled();
	});

	it('can be disabled', () => {
		const wrapper = shallow(<ToolbarItem title="Test" icon="test" onClick={noop} disabled />);
		expect(wrapper).toMatchSnapshot();
	});

	it('shouldn\'t fire click handlers when disabled', () => {
		const handler = jest.fn();
		const wrapper = shallow(<ToolbarItem title="Test" icon="test" onClick={handler} disabled />);
		wrapper.simulate('click');
		expect(handler).not.toHaveBeenCalled();
	});

	it('can be active', () => {
		const wrapper = shallow(<ToolbarItem title="Test" icon="test" onClick={noop} active />);
		expect(wrapper).toMatchSnapshot();
	});

	it('can render title', () => {
		const wrapper = shallow(<ToolbarItem title="Test" showtitle icon="test" onClick={noop} />);
		expect(wrapper).toMatchSnapshot();
	});
});
