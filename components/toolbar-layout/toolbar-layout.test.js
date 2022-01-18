import * as React from 'react';
import { shallow } from 'enzyme';

import LayoutToolbar from './toolbar-layout';

describe('<LayoutToolbar />', () => {
	it('should render the list of toolbar items', () => {
		const noop = () => {};
		const modularToolBarItems = {
			title: 'Noop',
			icon: 'left',
			onClick: noop,
			active: true,
			children: [
				{
					title: 'noop',
					active: false,
					icon: 'left',
					onClick: noop
				},
				{
					title: 'noop',
					active: false,
					icon: 'left',
					onClick: noop
				},
				{
					title: 'noop',
					active: false,
					icon: 'left',
					onClick: noop
				}
			]
		};
		const wrapper = shallow(<LayoutToolbar {...modularToolBarItems} />);
		expect(wrapper).toMatchSnapshot();
	});
});
