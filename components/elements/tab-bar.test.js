import * as React from 'react';
import { shallow, mount } from 'enzyme';

import TabBar from './tab-bar';
import { TabLink } from './tabItem';


describe('Tabs', () => {
	const onChange = jest.fn();

	const stubElement = () => (
		<TabBar activeTab="Music" onChange={onChange} tabs={['Music', 'Video', 'Text', 'Image']} />
	);

	it('should render properly', () => {
		const tabBar = shallow(stubElement());
		expect(tabBar).toMatchSnapshot();
	});

	it('should call onChange', () => {
		const tabBar = mount(stubElement());
		const tabItem = tabBar.find(TabLink).at(2);
		tabItem.simulate('click');

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenLastCalledWith('Text');
		onChange.mockClear();
	});
});
