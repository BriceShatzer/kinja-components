/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import Authors from './authors';
import { AuthorWrapper } from './author-card';

describe('<Authors />', () => {
	const onClick = jest.fn();

	const authors = [
		{id: '123456', displayName: 'Booker Simpson Long Name', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'booker-a'},
		{id: '125456', displayName: 'Booker Simpson Long Name', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'booker-b'},
		{id: '123452', displayName: 'Booker Simpson Long Name', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'booker-c'}
	];

	const stubElement = () => (
		<Authors
			items={authors}
			redirectHandler={onClick}
		/>
	);
	it('should render and match snapshot', () => {
		const authors = mount(stubElement());
		expect(authors).toMatchSnapshot();
	});

	it('should pass the author screenName to the handler', () => {
		const authors = mount(stubElement());
		const author = authors.find(AuthorWrapper).at(0);
		author.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith('booker-a');
	});
});
