/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import RecentSearches, { ClearWrapper } from './recent-searches';


describe('<RecentSearches />', () => {
	const onClick = jest.fn();
	const onClear = jest.fn();

	const stubElement = () => (
		<RecentSearches
			onClear={onClear}
			onClick={onClick}
			keywords={['Oliver Tree', 'Alex Lahey']}
			theme="jezebel"
		/>
	);
	it.skip('should render and match snapshot', () => {
		const recentSearches = mount(stubElement());
		expect(recentSearches).toMatchSnapshot();
	});

	it('should render buttons with the keywords', () => {
		const recentSearches = mount(stubElement());
		const buttons = recentSearches.find('Button');

		expect(buttons).toHaveLength(2);
		expect(buttons.at(0).text()).toBe('Oliver Tree');
	});

	it('should call onClick', () => {
		const recentSearches = mount(stubElement());
		const button = recentSearches.find('Button').at(1);
		button.simulate('click');

		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith('Alex Lahey');
	});

	it('should call onClear', () => {
		const recentSearches = mount(stubElement());
		const clear = recentSearches.find(ClearWrapper);
		clear.simulate('click');

		expect(onClear).toHaveBeenCalledTimes(1);
	});
});
