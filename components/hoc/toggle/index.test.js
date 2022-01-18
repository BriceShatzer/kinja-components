// @flow

import React from 'react';
import { mount } from 'enzyme';

import Toggle from './';

const ExampleComponent = ({ isOpen, toggle }: {
	isOpen: boolean,
	toggle: () => void,
	close: () => void
}) => (
	isOpen ?
		(<div className="open"><button onClick={() => toggle()} /></div>) :
		(<div className="closed"><button onClick={() => toggle()} /></div>)
);

const Test = Toggle(ExampleComponent);

describe('<Toggle />', () => {
	it('is closed by default', () => {
		const wrapper = mount(<Test />);
		expect(wrapper).toMatchSnapshot();
	});
	it('can be opened', () => {
		const wrapper = mount(<Test />);
		wrapper.find('button').simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
	it('and closed again', () => {
		const wrapper = mount(<Test />);
		wrapper.find('button').simulate('click');
		wrapper.find('button').simulate('click');
		expect(wrapper).toMatchSnapshot();
	});
});
