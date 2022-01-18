/* eslint no-unused-expressions:0 */

import * as React from 'react';
import { shallow } from 'enzyme';

import FieldInput from './field';
import Button from '../../buttons';
import Textfield18 from 'kinja-components/components/form/textfield18';

const stubElement = ({
	value,
	onChange = () => {},
	onDelete = () => {},
	onEnter = () => {},
	showDelete = true,
	canDelete = true
} = {}) => (
	<FieldInput
		value={value}
		onChange={onChange}
		canDelete={canDelete}
		onDelete={onDelete}
		onEnter={onEnter}
		showDelete={showDelete}
		language="en-US"
		name="test"
	/>
);

const sampleData = {
	label: 'foo',
	value: 'bar'
};

describe('<ReviewDataField />', () => {
	let changeHandler;
	let deleteHandler;
	let enterHandler;
	let wrapper;

	beforeEach(() => {
		changeHandler = jest.fn();
		deleteHandler = jest.fn();
		enterHandler = jest.fn();
		wrapper = shallow(stubElement({
			value: sampleData,
			onChange: changeHandler,
			onDelete: deleteHandler,
			onEnter: enterHandler
		}));
	});

	it('renders fields based on data', () => {
		expect(wrapper).toMatchSnapshot();
	});

	it('fires a change event when you change title', () => {
		wrapper.find(Textfield18).at(0).simulate('change', 'baz');
		expect(changeHandler).toHaveBeenCalledWith({
			label: 'baz',
			value: sampleData.value
		});
	});

	it('fires a change event when you change content', () => {
		wrapper.find(Textfield18).at(1).simulate('change', 'baz');
		expect(changeHandler).toHaveBeenCalledWith({
			label: sampleData.label,
			value: 'baz'
		});
	});

	it('fires a delete event when you click on the button', () => {
		wrapper.find(Button).simulate('click');
		expect(deleteHandler).toHaveBeenCalled();
	});

	it('fires an enter event', () => {
		wrapper.find(Textfield18).at(1).simulate('keyDown', {
			key: 'Enter',
			preventDefault: () => {}
		});
		expect(enterHandler).toHaveBeenCalled();
	});

	it('fires an onChange event if there is only a title', () => {
		const onChange = jest.fn();
		const element = shallow(stubElement({
			onChange,
			value: { label: '', value: '' }
		}));
		element.find(Textfield18).at(0).simulate('change', 'foo');
		expect(onChange).toHaveBeenCalledWith({ label: 'foo', value: '' });
	});
});
