import React from 'react';
import { shallow } from 'enzyme';

import { Trending } from './trending';

describe('Trending', () => {
	it('should render', () => {

		const wrapper = shallow(<Trending/>);
		expect(wrapper).toMatchSnapshot();

	});
});
