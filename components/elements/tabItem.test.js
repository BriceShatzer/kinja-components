import * as React from 'react';

import { shallow } from 'enzyme';

import TabItem from './tabItem';

const stubElement = ({
	index = 1,
	onClick = () => {},
	hidden = false,
	value,
	label,
	count
} = {}) => (
	<TabItem
		onClick={onClick}
		index={index}
		value={value}
		label={label}
		hidden={hidden}
		count={count}
	/>
);

describe('Tabs', () => {
	it('should render an item', () => {
		const value = 'test';
		const label = 'hello';

		const wrapper = shallow(
			stubElement({ value, label })
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('should not render when hidden', () => {
		const value = 'test';
		const label = 'hello';

		const hiddenWrapper = shallow(
			stubElement({ value, label, hidden: true })
		);
		expect(hiddenWrapper).toMatchSnapshot();
	});

	it('should contain count', () => {
		const label = 'angry men';
		const count = 12;

		const hiddenWrapper = shallow(
			stubElement({ value: '', label, count })
		);
		expect(hiddenWrapper).toMatchSnapshot();
	});

	it('should not contain count', () => {
		const label = 'angry men';

		const hiddenWrapper = shallow(
			stubElement({ value: '', label })
		);
		expect(hiddenWrapper).toMatchSnapshot();
	});
});
