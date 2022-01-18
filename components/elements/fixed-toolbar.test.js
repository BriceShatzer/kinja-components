import * as React from 'react';
import { shallow } from 'enzyme';

import FixedToolbar from './fixed-toolbar';

describe('<FixedToolbar />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<FixedToolbar />);
		expect(wrapper).toMatchSnapshot();
	});
});
