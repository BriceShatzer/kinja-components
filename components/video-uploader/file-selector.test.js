import React from 'react';
import { shallow, mount } from 'enzyme';

import FileSelector from './file-selector';

const mockFile = new File('abc'.split(''), 'hello.mp4', {
	type: 'video/mp4',
	lastModified: 1529951657565
});

const mockSubmit = jest.fn();

const stubElement = ({
	file = null
} = {}) => (
	<FileSelector
		title="Upload a video"
		file={file}
		onSubmit={mockSubmit}
	/>
);

describe('<VideoUploader />', () => {
	it('should render with file selector', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should accept a file as props', () => {
		const wrapper = shallow(stubElement({ file: mockFile }));
		expect(wrapper.state('file')).toBe(mockFile);
		expect(wrapper).toMatchSnapshot();
	});

	it('should set file when input changes', () => {
		const wrapper = mount(stubElement());
		wrapper.find('input[type="file"]')
			.simulate('change', { target: { files: [mockFile]}});
		expect(wrapper.state('file')).toBe(mockFile);
	});

	it('should pass the file through "onSubmit" if insert button clicked', () => {
		const wrapper = shallow(stubElement({ file: mockFile }));
		wrapper.find('Button').simulate('click');
		expect(mockSubmit).toHaveBeenCalledWith(mockFile);
	});
});