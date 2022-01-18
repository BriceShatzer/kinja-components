/* eslint-disable flowtype/no-types-missing-file-annotation */

import * as React from 'react';
import { mount } from 'enzyme';
import ImageUpload from './image-upload';

const fixture = {
	imageURL: 'https://res.cloudinary.com/gawker-media/image/upload/v1495783363/e8mjtsueifdddwlhvwlj.png',
	invalidURL: 'foo',
	failure: { meta: { error: { message: 'uploadfailed' } } },
	invalidImageMessage: 'This URL is invalid. Please use a valid image URL.',
	success: {
		public_id: 'string',
		url: 'string',
		format: 'jpg',
		width: 100,
		height: 100
	},
	image: {
		id: 'string',
		url: 'string',
		format: 'jpg',
		width: 100,
		height: 100
	}
};

const eventWithValue = (value: string): {target: {value: string}} => ({ target: { value } });
const noop = () => {};

const stubElement = ({
	imageUploader = jest.fn().mockReturnValue(Promise.resolve(fixture.success)),
	onChange = noop,
	onInputChange = noop,
	onError = noop,
	onUploadStarted = noop,
	value
} = {}) => (
	<ImageUpload
		imageUploader={imageUploader}
		onChange={onChange}
		onInputChange={onInputChange}
		onError={onError}
		onUploadStarted={onUploadStarted}
		value={value}
	/>
);

describe('<ImageUpload />', () => {
	describe('structure', () => {
		let wrapper;
		beforeAll(() => {
			wrapper = mount(stubElement());
		});

		it('should have a text field and file field', () => {
			expect(wrapper).toMatchSnapshot();
		});
	});

	it('should show the url of the starting value in the Textfield', () => {
		const wrapper = mount(stubElement({
			value: fixture.image
		}));
		expect(wrapper).toMatchSnapshot();
	});

	it('should show error message when url is not valid', () => {
		const wrapper = mount(stubElement());

		expect(wrapper).toMatchSnapshot();
		wrapper.find('Textfield18 input').simulate('change', eventWithValue(fixture.invalidURL));
		expect(wrapper).toMatchSnapshot();
	});

	it('should show error message when url is not valid then hide the error when the field is empty', () => {
		const onUploadStarted = jest.fn();
		const wrapper = mount(stubElement({
			onUploadStarted
		}));

		wrapper.find('Textfield18 input').simulate('change', eventWithValue(fixture.invalidURL));
		wrapper.find('Textfield18 input').simulate('change', eventWithValue(''));
		expect(wrapper).toMatchSnapshot();
		expect(onUploadStarted).not.toHaveBeenCalled();
	});

	it('should call the onInputChange cb when the url changes', () => {
		const onInputChange = jest.fn();
		const onUploadStarted = jest.fn();
		const wrapper = mount(stubElement({
			onInputChange,
			onUploadStarted
		}));

		wrapper.find('Textfield18 input').simulate('change', eventWithValue(fixture.imageURL));
		expect(onInputChange).toHaveBeenCalledWith(fixture.imageURL);
		expect(onUploadStarted).toHaveBeenCalledWith(fixture.imageURL);
	});

	it('should call the onChange cb after image upload succeeds', async () => {
		const onChange = jest.fn();
		const wrapper = mount(stubElement({
			onChange
		}));

		await wrapper.find('Textfield18 input').simulate('change', eventWithValue(fixture.imageURL));
		expect(onChange).toHaveBeenCalledWith(fixture.image);
	});

	it('should set the error state after the image upload fails', async () => {
		const onChange = jest.fn();
		const wrapper = mount(stubElement({
			imageUploader: jest.fn().mockRejectedValueOnce(fixture.failure),
			onChange
		}));

		expect(wrapper).toMatchSnapshot();
		await wrapper.find('Textfield18 input').simulate('change', eventWithValue(fixture.imageURL));
		expect(onChange).not.toHaveBeenCalled();
		expect(wrapper).toMatchSnapshot();
	});

	it('should call the onInputChange cb when the file changes', () => {
		const onInputChange = jest.fn();
		const wrapper = mount(stubElement({
			onInputChange
		}));

		wrapper.find('Filefield input').simulate('change');
		expect(onInputChange).toHaveBeenCalled();
	});

	it('should call the onError cb when the uploader returns with an error', async () => {
		const onError = jest.fn();
		const wrapper = mount(stubElement({
			onError,
			imageUploader: jest.fn().mockReturnValue(Promise.reject(fixture.failure))
		}));

		await wrapper.find('Textfield18 input').simulate('change', eventWithValue(fixture.imageURL));
		expect(onError).toHaveBeenCalledWith(fixture.failure);
	});
});
