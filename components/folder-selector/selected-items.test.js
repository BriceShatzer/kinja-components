import * as React from 'react';
import { mount } from 'enzyme';

import SelectedItems, { IconWrapper } from './selected-items';
import { blogsForMultipleSelection } from './fixtures';


describe('<FolderBrowser/>', () => {
	const onDeselect = jest.fn();
	const props = {
		onDeselect,
		placeholder: 'What is your soundcloud rapper name?',
		selectedItems: blogsForMultipleSelection
	};

	let selectedItems;
	beforeEach(() => {
		selectedItems = mount(<SelectedItems {...props} />);
	});

	it('should render properly', () => {
		expect(selectedItems).toMatchSnapshot();
	});

	it('should update the state on mouseover', () => {
		const iconWrapper = selectedItems.find(IconWrapper).at(0);
		iconWrapper.simulate('mouseover');
		expect(selectedItems.state().hoveredElementId).toBe('1');

		const iconWrapper2 = selectedItems.find(IconWrapper).at(1);
		iconWrapper2.simulate('mouseover');
		expect(selectedItems.state().hoveredElementId).toBe('2');
	});

	it('should call onDeselect', () => {
		const iconWrapper = selectedItems.find(IconWrapper).at(0);
		iconWrapper.simulate('click');

		expect(onDeselect).toBeCalledTimes(1);
		expect(onDeselect).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'click'
			}),
			'1',
			undefined
		);
	});
});
