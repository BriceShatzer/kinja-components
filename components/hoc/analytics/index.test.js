// @flow

import React from 'react';
import { shallow } from 'enzyme';

import Analytics from './';

describe('<Analytics />', () => {
	beforeEach(() => {
		window.ga = jest.fn();
	});

	it('has a prop named `ga`', () => {
		const Test = Analytics(() => null);
		const wrapper = shallow(<Test />);
		expect(wrapper).toMatchSnapshot();
	});

	it('preserves the composed components props', () => {
		const StubbedComponent = ({ additionalProp }: { additionalProp: string}) => <div>{additionalProp}</div>;
		const Test = Analytics(props => <StubbedComponent {...props} />);
		const wrapper = shallow(<Test additionalProp={'Hello World!'} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('triggers an analytic request with `sendEvent`', () => {
		const Test = Analytics(() => null);
		const wrapper = shallow(<Test />);
		const eventData = ['testA', 'clickB', 'testC'];
		wrapper.prop('ga')(...eventData);
		expect(window.ga.mock.calls[0]).toMatchSnapshot();
	});
});
