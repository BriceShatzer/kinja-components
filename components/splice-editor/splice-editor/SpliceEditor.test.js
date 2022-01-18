import * as React from 'react';
import { shallow } from 'enzyme';

import SpliceEditor, { EmbiggenedWrapper } from './SpliceEditor';

import author from 'kinja-components/__stubs__/stubbedAuthorResponse.json';
import { currentBlog, currentPost, lastSharedBlogs } from '../fixtures';
import { blogItemTheTakeout, levelsForMultipleSelection } from 'kinja-components/components/folder-selector/fixtures';


describe('<SpliceEditor />', () => {
	const onCancel = jest.fn();
	const onShare = jest.fn();
	const onUnshare = jest.fn();
	const todayTimemillisStub = 1551871107757; // 03/06/2019
	let spliceEditor;

	const stubElement = () => (
		<SpliceEditor
			authors={[author]}
			blog={currentBlog}
			inModal
			lastSharedBlogs={lastSharedBlogs}
			levels={levelsForMultipleSelection}
			onCancel={onCancel}
			onShare={onShare}
			onUnshare={onUnshare}
			pageType="frontpage"
			post={currentPost}
			timemillis={todayTimemillisStub}
		/>
	);

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => todayTimemillisStub);
		spliceEditor = shallow(stubElement());
	});

	it('should render properly', () => {
		expect(spliceEditor).toMatchSnapshot();
	});

	it('should call onUnshare', () => {
		const lastSharedPanel = spliceEditor.find('LastSharedPanel');
		expect(lastSharedPanel).toBeTruthy();

		spliceEditor.instance().onUnshare(123, 'Test');
		expect(onUnshare).toHaveBeenCalledTimes(1);
		expect(onUnshare).toHaveBeenCalledWith(123, 'Test');
		onUnshare.mockClear();
	});

	it('should disable the Share button', () => {
		const button = spliceEditor.find({ label: 'Share' });
		expect(button.props().disabled).toBe(true);
	});

	it('should enable share button when a blog is selected', () => {
		spliceEditor.setState({
			selectedBlogs: [blogItemTheTakeout]
		});
		const button = spliceEditor.find({ label: 'Share' });
		expect(button.props().disabled).toBe(false);
	});

	it('should turn the embiggen property OFF', () => {
		const storyCardEmbiggened = spliceEditor.find('StoryCardEmbiggened');
		expect(storyCardEmbiggened).toBeTruthy();

		const embiggenedWrapper = spliceEditor.find(EmbiggenedWrapper);
		embiggenedWrapper.simulate('click');
		spliceEditor.update();

		const storyCardCompact = spliceEditor.find('StoryCardCompact');
		expect(storyCardCompact).toBeTruthy();
	});

	it('should call onCancel', () => {
		const spliceEditor = shallow(stubElement());
		const cancel = spliceEditor.find({ label: 'Cancel' });
		cancel.simulate('click');

		expect(onCancel).toHaveBeenCalled();
		expect(onCancel).toHaveBeenCalledTimes(1);
		onCancel.mockClear();
	});

	it('should not call onShare', () => {
		const button = spliceEditor.find({ label: 'Share' });
		button.simulate('click');

		expect(onShare).not.toHaveBeenCalled();
		onShare.mockClear();
	});

	it('should call onShare', () => {
		const confirmation = spliceEditor.find('Confirmation');
		expect(confirmation).toBeTruthy();

		const button = spliceEditor.find({ label: 'Share' });
		button.simulate('click');

		expect(onShare).toHaveBeenCalledTimes(1);
		expect(onShare).toHaveBeenCalledWith({
			isEmbiggened: false,
			selectedBlogs: expect.any(Array),
			timemillis: expect.any(Number)
		});
		onShare.mockClear();
	});
});
