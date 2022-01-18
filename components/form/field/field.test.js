import * as React from 'react';

import { mount } from 'enzyme';

import Field from './field';

const testLabel = 'Label';
const testValue = 'Value';
const testError = 'Error';
const testChildren = 'Hello';

const stubElement = ({
	children = testChildren,
	label,
	value,
	error,
	counter
} = {}) => (
	<Field label={label} value={value} error={error} counter={counter}>
		{children}
	</Field>
);

describe('<Field />', () => {
	it('should render properly', () => {
		const wrapper = mount(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should show the label when available', () => {
		const wrapper = mount(stubElement({
			label: testLabel
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should show the error and hide the label', () => {
		const wrapper = mount(stubElement({
			label: testLabel,
			error: testError
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should show the counter', () => {
		const wrapper = mount(stubElement({
			value: testValue,
			counter: true
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should show an error when maximum character limit is reached', () => {
		const wrapper = mount(stubElement({
			value: testValue,
			counter: true,
			limit: testValue.length - 1
		}));
		expect(wrapper).toMatchSnapshot();
	});
});
