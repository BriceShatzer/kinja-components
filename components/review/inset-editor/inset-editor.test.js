/* eslint no-unused-expressions: 0 */

import * as React from 'react';
import { mount } from 'enzyme';
import InsetEditor from './inset-editor';
import Button from '../../buttons';
import Textfield18 from 'kinja-components/components/form/textfield18';
import ImageUpload from '../../form/image-upload';
import ReviewBox from '../review-box';

const cloudinaryResponse = {
	public_id: 'string',
	url: 'string',
	format: 'jpg',
	width: 100,
	height: 100
};

const stubElement = ({
	initialValues,
	onCancel = () => {},
	onSubmit = () => {},
	imageUploader = () => Promise.resolve(cloudinaryResponse),
	canInsertBox = true
} = {}) => (
	<InsetEditor
		language="en-US"
		onSubmit={onSubmit}
		onCancel={onCancel}
		initialValues={initialValues}
		imageUploader={imageUploader}
		canInsertBox={canInsertBox}
	/>
);

describe('<ReviewInsetEditor />', () => {
	it('should trigger cancel and save events', () => {
		const cancelHandler = jest.fn();
		const submitHandler = jest.fn();
		const wrapper = mount(stubElement({
			onCancel: cancelHandler,
			onSubmit: submitHandler,
			initialValues: {
				title: 'test',
				reviewData: []
			}
		}));
		const value = wrapper.state('data');
		wrapper.find(Button).at(1).simulate('click');
		expect(cancelHandler).toHaveBeenCalled();
		wrapper.find(Button).at(2).simulate('click');
		expect(submitHandler).toHaveBeenCalledWith(value, false);
		wrapper.find(Button).at(3).simulate('click');
		expect(submitHandler).toHaveBeenCalledWith(value, true);
	});

	it('doesn\'t allow you to save without a title', () => {
		const submitHandler = jest.fn();
		const wrapper = mount(stubElement({
			onSubmit: submitHandler
		}));
		expect(wrapper).toMatchSnapshot();
		wrapper.find(Button).at(2).simulate('click');
		expect(submitHandler).not.toHaveBeenCalled();
		wrapper.find(Button).at(3).simulate('click');
		expect(submitHandler).not.toHaveBeenCalled();

		expect(wrapper).toMatchSnapshot();
		wrapper.find(Textfield18).at(0).simulate('change', 'text');
		expect(wrapper).toMatchSnapshot();
	});

	it('doesn\'t allow you to save while the image is uploading and shows a Loading animation', () => {
		const wrapper = mount(stubElement({
			imageUploader: () => new Promise(() => {})
		}));
		wrapper.find(ImageUpload).props().onUploadStarted();
		expect(wrapper).toMatchSnapshot();
		const reviewBox = wrapper.find(ReviewBox);
		expect(reviewBox).toMatchSnapshot();
	});

	it('shouldn\'t display `Save and insert` button when canInsertBox is false ', () => {
		const wrapper = mount(stubElement({
			canInsertBox: false
		}));
		expect(wrapper).toMatchSnapshot();
	});
});
