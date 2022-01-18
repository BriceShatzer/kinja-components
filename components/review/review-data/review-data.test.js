/* eslint no-unused-expressions:0 */

import * as React from 'react';
import { mount } from 'enzyme';

import ReviewData from './review-data';
import FieldInput from './field';
import Button from '../../buttons';

const createElement = ({
	value = [],
	onChange = () => {}
} = {}) => (
	<ReviewData
		value={value}
		onChange={onChange}
		language="en-US"
		name="test"
	/>
);

const sampleData = [{
	foo: 'bar'
}, {
	'cat says': 'meow'
}];

const addNewLine = (wrapper, index) => wrapper.find(Button).at(index).simulate('click');
const removeLine = (wrapper, index) => wrapper.find(FieldInput).at(index).props().onDelete();
const changeLine = (wrapper, index, data) => {
	const line = wrapper.find(FieldInput).at(index);
	line.props().onChange(data);
};

describe('<ReviewData />', () => {
	let handler;
	let wrapper;

	beforeEach(() => {
		handler = jest.fn();
		wrapper = mount(createElement({
			value: sampleData,
			onChange: handler
		}));
	});

	it('renders fields based on data', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('fires a change event when you change values', () => {
		changeLine(wrapper, 0, {
			goo: 'baz'
		});
		expect(handler).toHaveBeenCalledWith([{
			goo: 'baz'
		}, sampleData[1]]);
	});

	it('can add new line', () => {
		addNewLine(wrapper, 2);
		expect(wrapper).toMatchSnapshot();
		expect(handler).toHaveBeenCalledWith(sampleData.concat({ label: '', value: '' }));
	});

	it('can delete line', () => {
		removeLine(wrapper, 0);
		expect(wrapper).toMatchSnapshot();
		expect(handler).toHaveBeenCalledWith([sampleData[1]]);
	});

	it('data remains consistent after a combination of deletions and insertions', () => {
		addNewLine(wrapper, 2);
		addNewLine(wrapper, 3);
		removeLine(wrapper, 0);
		changeLine(wrapper, 1, {
			'dog says': 'woof'
		});
		changeLine(wrapper, 0, {
			'kitty says': 'meow'
		});
		expect(wrapper).toMatchSnapshot();
	});

	it('adds new row when you press enter on the last line', () => {
		wrapper.find(FieldInput).at(sampleData.length - 1).props().onEnter();
		expect(wrapper).toMatchSnapshot();
	});
});
