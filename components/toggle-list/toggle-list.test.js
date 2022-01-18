/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import ToggleList from './toggle-list';

describe('<ToggleList />', () => {
	it('starts', () => {
		const toggles = [
			{
				name: 'noBlogBylines',
				checked: true,
				label: 'Bylines',
				onChange: () => {},
				small: false
			},
			{
				name: 'commentsDisabled',
				checked: true,
				label: 'Comments',
				onChange: () => {},
				small: false
			},
			{
				name: 'hideViewcounts',
				checked: true,
				label: 'Pageviews',
				onChange: () => {},
				small: false
			}
		];
		shallow(<ToggleList toggles={toggles} />);
	});
});
