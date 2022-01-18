import * as React from 'react';

import { shallow } from 'enzyme';
import noop from 'lodash/noop';

import Tabs from './tabs';
import TabItem from './tabItem';

describe('Tabs', () => {
	it('should render a <ul>', () => {
		const wrapper = shallow(
			<Tabs onChange={noop}>
				<TabItem onClick={noop} index={0} label="" value="" />
			</Tabs>
		);
		expect(wrapper).toMatchSnapshot();
	});
});
