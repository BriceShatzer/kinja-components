import * as React from 'react';
import { mount } from 'enzyme';

import SearchBar from './SearchBar';


describe('<SearchBar />', () => {
	it('should render and match snapshot', () => {
		const searchBar = mount(<SearchBar placeholder="Test" />);
		expect(searchBar).toMatchSnapshot();
	});

	it('should call onSearch with the inputValue when the button is clicked', () => {
		const handler = jest.fn();
		const inputValue = 'Tom Hardy';
		const searchBar = mount(<SearchBar inputValue={inputValue} placeholder="Test" onSearch={handler} />);
		const button = searchBar.find('button');
		button.simulate('click');

		expect(handler).toHaveBeenCalledWith(inputValue);
	});

	it('should call onSearch with the inputValue when Enter is pressed', () => {
		const handler = jest.fn();
		const inputValue = 'Emily Blunt';
		const searchBar = mount(<SearchBar inputValue={inputValue} placeholder="Test" onSearch={handler} />);
		const input = searchBar.find('input');
		input.simulate('keyDown', { key: 'Enter' });

		expect(handler).toHaveBeenCalledWith(inputValue);
	});

	it('should set focus on the search input at mount if focusOnMount is true', () => {
		const searchBar = mount(<SearchBar focusOnMount />);
		const { inputElement } = searchBar.instance();

		jest.spyOn(inputElement.current, 'focus');

		searchBar.instance().componentDidMount();

		expect(inputElement.current.focus).toHaveBeenCalledTimes(1);
	});

	it('should not set focus on the search input focusOnMount is not specified', () => {
		const searchBar = mount(<SearchBar />);
		const { inputElement } = searchBar.instance();

		jest.spyOn(inputElement.current, 'focus');

		searchBar.instance().componentDidMount();

		expect(inputElement.current.focus).not.toHaveBeenCalled();
	});
});
