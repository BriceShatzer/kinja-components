/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import AuthorCard from './author-card';
import { AuthorWrapper } from './author-card';


describe('<AuthorCard />', () => {
	const onClick = jest.fn();
	const authorId = '123456';

	const author = {id: authorId, displayName: 'Booker Simpson Long Name', avatar: {id: 'gdxk7p8bwzz4adbfoklv'}, screenName: 'booker'};

	const stubElement = () => (
		<AuthorCard
			{...author}
			clickHandler={onClick}
		/>
	);
	it('should render and match snapshot', () => {
		const authorCard = mount(stubElement());
		expect(authorCard).toMatchSnapshot();
	});

	it('should pass the author screenName to the handler', () => {
		const authorCard = mount(stubElement());
		const authorElem = authorCard.find(AuthorWrapper).at(0);
		authorElem.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith(author.screenName);
	});
});
