import * as React from 'react';
import { mount } from 'enzyme';

import SearchInput from './searchBar';


describe.skip('<SearchInput />', () => {
	it('should render properly', () => {
		const wrapper = mount(
			<SearchInput placeholder={'Choose story types or tags'} />
		);
		expect(wrapper).toMatchSnapshot();
	});

	it.skip('should pass search values', () => {
		const handler = jest.fn();
		const wrapper = mount(
			<SearchInput placeholder={'Choose story types or tags'} onSearch={handler}/>
		);

		const inputValue = 'More cars that I can count';
		const input = wrapper.find('input');

		input.simulate('change', { target: { value: inputValue }});
		input.simulate('keyDown', { key: 'Enter' });

		expect(handler).toHaveBeenCalled();
	});
});
