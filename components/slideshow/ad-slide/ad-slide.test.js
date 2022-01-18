import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../buttons';

import AdSlide from './ad-slide';

describe('Slideshow <AdSlide />', () => {
	it('should render an ad container', () => {
		const wrapper = mount(<AdSlide />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render with Wide aspect ratio if set', () => {
		expect(<AdSlide aspectRatio="Wide"/>).toMatchSnapshot();
	});
	it('should disable buttons', () => {
		expect(<AdSlide disabled/>).toMatchSnapshot();
	});
	it('should fire left click event', () => {
		const handler = jest.fn();
		const wrapper = mount(<AdSlide onLeftClick={handler} />);
		wrapper.find(Button).at(0).simulate('click');
		expect(handler).toHaveBeenCalled();
	});
	it('should fire left right event', () => {
		const handler = jest.fn();
		const wrapper = mount(<AdSlide onRightClick={handler} />);
		wrapper.find(Button).at(1).simulate('click');
		expect(handler).toHaveBeenCalled();
	});
});
