import * as React from 'react';
import { shallow } from 'enzyme';

import { PostToolsFrontpage } from './post-tools-frontpage';

describe('<PostToolsFrontpage />', () => {
	it('should render frontpage post tools', () => {
		const wrapper = shallow(
			<PostToolsFrontpage />
		);
		expect(wrapper.dive()).toMatchSnapshot();
	});
});
