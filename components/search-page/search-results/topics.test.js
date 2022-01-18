/* @flow */

import * as React from 'react';
import { mount } from 'enzyme';

import Topics from './topics';
import { TopicsItem } from './topics';
import { createBlogId } from 'kinja-magma/models/Id';

describe('<Topics />', () => {
	const onClick = jest.fn();

	const topics = [
		{sourceId: '123', blogId: createBlogId(1), source: 'Tag', suggestion: 'Books', cardinality: 123}
	];

	const stubElement = () => (
		<Topics
			items={topics}
			redirectHandler={onClick}
			blogs={[]}
		/>
	);
	it('should render and match snapshot', () => {
		const topics = mount(stubElement());
		expect(topics).toMatchSnapshot();
	});

	it('should pass the author screenName to the handler', () => {
		const topicsElem = mount(stubElement());
		const topic = topicsElem.find(TopicsItem).at(0);
		topic.simulate('click');
		expect(onClick).toHaveBeenCalledTimes(1);
		expect(onClick).toHaveBeenCalledWith(topics[0]);
	});
});
