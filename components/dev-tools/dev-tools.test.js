import * as React from 'react';
import { shallow } from 'enzyme';

import { DevToolsContainerWithoutHOC } from './dev-tools';

describe('<DevTools />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<DevToolsContainerWithoutHOC isOpen={false} toggle={() => {}} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render when open', () => {
		const wrapper = shallow(<DevToolsContainerWithoutHOC isOpen={true} toggle={() => {}} />);
		expect(wrapper).toMatchSnapshot();
	});
});
