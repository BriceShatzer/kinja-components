// @flow

import React from 'react';
import { shallow } from 'enzyme';

import VideoUploader from './video-uploader';

const mockFile = new File('abc'.split(''), 'hello.mp4', {
	type: 'video/mp4',
	lastModified: 1529951657565
});

const stubbedUploader = {
	setConfig: () => {},
	start: () => Promise.resolve()
};

const mockUpdateResponse = {
	id: '123456',
	title: '',
	description: '',
	monetizable: false,
	network: '',
	tags: []
};

const mockCaptionResponse = {
	videoId: '123456',
	uuid: '132',
	language: 'English',
	label: 'en',
	format: 'vtt'
};

const modalEl = document.createElement('div');

const stubbedBlogModel = {
	on: () => {},
	off: () => {},
	get: key => {
		if (key === 'blog') {
			return {
				id: 1636027099,
				displayName: 'The A.V. Club'
			};
		} else if (key === 'storyType') {
			return {
				get: key => {
					if (key === 'title') {
						return '100 Episodes';
					}
				}
			};
		}
	}
};

const stubElement = ({
	file = mockFile
} = {}) => (
	<VideoUploader
		blogModel={stubbedBlogModel}
		file={file}
		modalEl={modalEl}
		isBlockNode={false}
		isListItem={false}
		// $FlowFixMe
		uploader={stubbedUploader}
		onCancel={() => {}}
		onError={() => {}}
		onCopyUrl={() => {}}
		getPrograms={() => Promise.resolve([])}
		createCaption={() => Promise.resolve(mockCaptionResponse)}
		enableCaptionUpload={false}
		createVideoFromUUID={() => Promise.resolve(mockUpdateResponse)}
	/>
);

describe('<VideoUploader />', () => {
	beforeEach(() => {
		global.requests = [];
		global.fetch = jest.fn().mockImplementation((url: string, config: any) => {
			global.requests.push({ url, config });
			const p = new Promise(resolve => {
				resolve({
					ok: true,
					status: 200,
					json: () => {
						return {
							data: {},
							meta: {}
						};
					}
				});
			});

			return p;
		});
	});

	it('should render with file selector', () => {
		const wrapper = shallow(stubElement());
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with file selected', async () => {
		const wrapper = shallow(stubElement({ file: mockFile }));
		await wrapper.setState({ isUploading: true });
		expect(wrapper.state('isUploading')).toBe(true);
		expect(wrapper).toMatchSnapshot();
	});
});
