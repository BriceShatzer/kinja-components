import * as React from 'react';

import { shallow } from 'enzyme';

import SendToEditor from './send-to-editor';

const noop = jest.fn();

const defaultValues = { notes: '', status: 'Freelancer Filed' };
const stubElement = ({
	onSubmit = noop,
	onCancel = noop,
	initialValues = defaultValues
} = {}) => (
	<SendToEditor
		language="en-US"
		onSubmit={onSubmit}
		onCancel={onCancel}
		initialValues={initialValues}
	/>
);

describe('<SendToEditor />', () => {
	it('should call onCancel when cancel', () => {
		const cancelHandler = jest.fn();
		const wrapper = shallow(stubElement({
			onCancel: cancelHandler
		}));

		wrapper.find({ weight: 'secondary' }).at(0).simulate('click');
		expect(cancelHandler).toHaveBeenCalledTimes(1);
	});

	it('should call onSubmit when submit', () => {
		const submitHandler = jest.fn();
		const wrapper = shallow(stubElement({
			onSubmit: submitHandler
		}));

		wrapper.find({ weight: 'primary' }).at(0).simulate('click');
		expect(submitHandler).toHaveBeenCalledTimes(1);
	});

	it('should render component with default state "Freelancer Filed" selected', () => {
		expect(shallow(stubElement())).toMatchSnapshot();
	});

	it('should set notes from initialValues', () => {
		const changedState = stubElement({
			initialValues: { notes: 'sic transit gloria mundi' }
		});

		expect(changedState).toMatchSnapshot();
	});

	it('should set status after changing the ButtonGroup', () => {
		const onSubmit = jest.fn();
		const wrapper = shallow(stubElement({ onSubmit }));

		// Change status
		wrapper.find('ButtonGroup').simulate('change', 'Ready for Copy Desk');
		// Submit
		wrapper.find({ weight: 'primary' }).at(0).simulate('click');
		expect(onSubmit.mock.calls[0]).toMatchSnapshot();
	});

	it('should set notes after changing notes', () => {
		const onSubmit = jest.fn();
		const wrapper = shallow(stubElement({ onSubmit }));

		// Change notes
		wrapper.find('Textarea').simulate('change', 'muhaha');
		// Submit
		wrapper.find({ weight: 'primary' }).at(0).simulate('click');
		expect(onSubmit.mock.calls[0]).toMatchSnapshot();
	});
});
