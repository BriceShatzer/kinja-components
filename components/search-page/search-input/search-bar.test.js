import * as React from 'react';
import { mount } from 'enzyme';

import SearchInput from './search-bar';


describe('<SearchInput />', () => {

	const props = {
		isEmptySearchField: true,
		isResultsPage: false,
		clearSuggestions: jest.fn(),
		onActionableSearch: jest.fn(),
		onFilterIconClick: jest.fn(),
		onResetSearchBar: jest.fn(),
		onManualSearch: jest.fn(),
		onSearch: jest.fn()
	};

	const stubElement = () => (
		<SearchInput {...props} />
	);
	it.skip('should render and match snapshot', () => {
		const searchInput = mount(stubElement());
		expect(searchInput).toMatchSnapshot();
	});
});
