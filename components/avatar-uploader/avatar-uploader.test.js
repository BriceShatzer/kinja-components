import * as React from 'react';
import { shallow } from 'enzyme';

import AvatarUploader from './avatar-uploader';


describe('<AvatarUploader />', () => {
	const onChange = jest.fn();
	const onError = jest.fn();

	const file = {
		lastModified: 1555323531237,
		lastModifiedDate: 'Mon Apr 15 2019 12:18:51 GMT+0200 (Central European Summer Time)',
		name: 'burrito.gif',
		size: 7068668,
		type: 'image/gif',
		webkitRelativePath: ''
	};

	const reject = () => ({ meta: { error: { message: 'Something went wrong' } } });
	const resolve = () => {
		return {
			public_id: 'wbbot6qcrfa4gmmh4tam',
			url: 'file',
			format: 'gif',
			width: 120,
			height: 120
		};
	};

	const stubElement = (isResolved = true) => (
		<AvatarUploader
			imageUploader={() => isResolved ? Promise.resolve(resolve()) : Promise.reject(reject())}
			onChange={onChange}
			onError={onError}
		/>
	);

	it('should render properly', () => {
		const avatarUploader = shallow(stubElement());
		expect(avatarUploader).toMatchSnapshot();
	});

	it('should call onChange on successful upload', async () => {
		const avatarUploader = shallow(stubElement());
		await avatarUploader.instance().upload(file);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onError).toHaveBeenCalledTimes(0);
		expect(onChange).toHaveBeenCalledWith({
			id: 'wbbot6qcrfa4gmmh4tam',
			url: 'file',
			format: 'gif',
			width: 120,
			height: 120
		});

		onChange.mockClear();
		onError.mockClear();
	});

	it('should call onError on upload failure', async () => {
		const avatarUploader = shallow(stubElement(false));
		await avatarUploader.instance().upload(file);
		expect(onError).toHaveBeenCalledTimes(1);
		expect(onError).toHaveBeenCalledWith({ 'meta': { 'error': { 'message': 'Something went wrong' }}});
	});
});
