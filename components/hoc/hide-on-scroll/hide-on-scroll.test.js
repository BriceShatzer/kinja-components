/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';
import HideOnScroll from './hide-on-scroll';

describe('<HideOnScroll />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<HideOnScroll>{() => <div></div>}</HideOnScroll>);
		expect(wrapper).toMatchSnapshot();
	});
	it('should say show', () => {
		const wrapper = shallow(<HideOnScroll>{hide => <div>{hide ? 'hide' : 'show'}</div>}</HideOnScroll>);
		const div = wrapper.find('div');
		expect(div.text()).toBe('show');
	});
});
