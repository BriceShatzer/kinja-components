/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import Controller from './searchCtrl';


describe.skip('<Controller />', () => {

	const props = {
		blogTheme: 'gizmodo',
		inputValue: '',
		recentSearches: [],
		suggestions: []
	};

	const stubElement = () => (
		<Controller {...props} />
	);
	it('should render and match snapshot', () => {
		const ctrl = mount(stubElement());
		expect(ctrl).toMatchSnapshot();
	});
});
