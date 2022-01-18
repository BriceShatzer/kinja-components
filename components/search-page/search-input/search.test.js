import * as React from 'react';
import { mount } from 'enzyme';

import Search from './search';


describe.skip('<Search />', () => {

	const props = {
		inputValue: 'test',
		suggestions: [],
		isEmptySearchField: false,
		isResultsPage: false,
		clearSuggestions: jest.fn(),
		onActionableSearch: jest.fn(),
		onFilterIconClick: jest.fn(),
		onManualSearch: jest.fn(),
		onSuggestionSelected: jest.fn(),
		onTyping: jest.fn(),
		resetSearchBar: jest.fn()
	};

	const stubElement = () => (
		<Search {...props} />
	);
	it('should render and match snapshot', () => {
		const search = mount(stubElement());
		expect(search).toMatchSnapshot();
	});
});
