import * as React from 'react';
import { mount } from 'enzyme';

import LastSharedPanel, { BlogItem, Title } from './LastSharedPanel';
import { lastSharedBlogs } from '../fixtures';


describe('<LastSharedPanel />', () => {
	const onUnshare = jest.fn();
	const component = mount(<LastSharedPanel
		lastSharedBlogs={lastSharedBlogs}
		onUnshare={onUnshare}
		timezone="America/New_York"
	/>);

	it('should render properly', () => {
		expect(component).toMatchSnapshot();
	});

	it('should open the panel', () => {
		const title = component.find(Title);
		title.simulate('click');
		component.update();

		expect(component.state().isOpen).toBe(true);
	});

	it('should call onUnshare and update state', () => {
		const blogItem = component.find(BlogItem).at(0);
		blogItem.simulate('mouseover');

		const button = blogItem.find({ label: 'Unshare' });
		button.simulate('click');

		const unshareModal = component.find('UnshareModal');
		expect(unshareModal).toBeTruthy();

		const okay = unshareModal.find({ label: 'Okay' });
		okay.simulate('click');

		expect(onUnshare).toHaveBeenCalledTimes(1);
		expect(onUnshare).toHaveBeenCalledWith('1538697436', 'Cosplay');

		const lastSharedBlogs = component.state().lastSharedBlogs;
		expect(lastSharedBlogs).toHaveLength(2);
		onUnshare.mockClear();
	});
});