/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import posts from 'kinja-components/__stubs__/postObjects.json';
import Carousel from './carousel';

describe('<Carousel />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<Carousel posts={posts.items.slice(0, 15)} />);
		expect(wrapper).toMatchSnapshot();
	});
});
