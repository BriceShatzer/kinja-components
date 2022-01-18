/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import PopularSearch, { Keyword, Title } from './popular-search';


describe('<PopularSearch />', () => {
	const onClick = jest.fn();
	const stubElement = ({ blogName = 'Jalopnik' } = {}) => (
		<PopularSearch
			blogName={blogName}
			keywords={['Uruk-hai', 'Goblins', 'Moria Orcs', 'Black Uruks']}
			onClick={onClick}
			theme="jalopnik"
		/>
	);
	it('should render and match snapshot', () => {
		const popularSearch = mount(stubElement());
		expect(popularSearch).toMatchSnapshot();
	});

	it('should add blogName to the title', () => {
		const blogName = 'Shire';
		const popularSearch = mount(stubElement({ blogName }));

		const title = popularSearch.find(Title).text();
		expect(title).toBe(`Popular searches on ${blogName}`);
	});

	it('should call onClick', () => {
		const popularSearch = mount(stubElement());
		const keyword = popularSearch.find(Keyword).at(1);

		keyword.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith('Goblins');
	});
});
