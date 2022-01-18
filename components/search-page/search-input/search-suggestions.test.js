/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import Suggestions from './search-suggestions';


describe('<Suggestions />', () => {

	const triggerElement = <a/>;

	const props = {
		trigger: triggerElement,
		handleSelectedSuggestion: jest.fn(),
		clearSuggestions: jest.fn()
	};

	const stubElement = () => (
		<Suggestions {...props} />
	);
	it('should render and match snapshot', () => {
		const suggestions = mount(stubElement());
		expect(suggestions).toMatchSnapshot();
	});
});
