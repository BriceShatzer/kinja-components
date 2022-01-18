import React from 'react';
import { StaticTopbar } from './topbar';
import { mount } from 'enzyme';

describe('Page layout/Static topbar', () => {
	it('should render', () => {
		const component = mount(<StaticTopbar blogName='clickhole' />);
		// Get around calculating number of displayable items in a test scenario
		component.setState({
			numberOfDisplayableItems: 15
		});
		expect(component.render()).toMatchSnapshot();
	});
	it('renders different order of blogs based on blogGroup type', () => {
		// Get around calculating number of displayable items in a test scenario
		const component = mount(<StaticTopbar blogName='gizmodo' />);
		component.setState({
			numberOfDisplayableItems: 15
		});
		expect(component.render()).toMatchSnapshot();
	});
	it('should move items that don\'t fit under the more button', () => {
		const component = mount(<StaticTopbar blogName='clickhole' />);
		component.setState({
			numberOfDisplayableItems: 10
		});
		expect(component.render()).toMatchSnapshot();
	});
	it('doesn\'t render separator if the cutoff is after one', () => {
		const component = mount(<StaticTopbar blogName='clickhole' />);
		component.setState({
			numberOfDisplayableItems: 14
		});
		expect(component.render()).toMatchSnapshot();
	});
	it('can open more dropdown', () => {
		const component = mount(<StaticTopbar blogName='clickhole' isOpen />);
		component.setState({
			numberOfDisplayableItems: 10
		});
		expect(component.render()).toMatchSnapshot();
	});
});
