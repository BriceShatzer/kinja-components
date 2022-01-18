import * as React from 'react';
import { shallow } from 'enzyme';

import { FilterTypeList, TagList, StoryTypeList } from './';

describe('<FilterTypeList />', () => {
	it('should render a list of filters', () => {
		const FilterListProps = {
			items: [
				{title: 'Car', canonical: '1521', type: 'tag'},
				{title: 'Crash', canonical: '234', type: 'tag'},
				{title: 'Bikes', canonical: '456', type: 'storytype'},
				{title: 'People', canonical: '1239', type: 'storytype'}
			]
		};
		const stubbedProps = {
			...FilterListProps,
			onRemoveItem: jest.fn()
		};

		const result = shallow(<FilterTypeList {...stubbedProps} />);
		expect(result).toMatchSnapshot();
	});
});

describe('<TagList />', () => {
	it('should render a list of filters', () => {
		const TagListProps = {
			items: [
				{displayName: 'Car', canonical: '1521', featured: true, count: 1},
				{displayName: 'Crash', canonical: '234', count: 1},
				{displayName: 'Bikes', canonical: '456', count: 1},
				{displayName: 'People', canonical: '1239', count: 1}
			]
		};
		const stubbedProps = {
			...TagListProps,
			onSelect: jest.fn()
		};

		const result = shallow(<TagList {...stubbedProps} />);
		expect(result).toMatchSnapshot();
	});
});

describe('<StoryTypeList />', () => {
	it('should render a list of filters', () => {
		const StoryListProps = {
			items: [
				{id: 1521, title: 'Car', canonical: '1521', featured: true, count: 1},
				{id: 234, title: 'Crash', canonical: '234', count: 1},
				{id: 456, title: 'Bikes', canonical: '456', count: 1},
				{id: 1239, title: 'People', canonical: '1239', count: 1}
			]
		};
		const stubbedProps = {
			...StoryListProps,
			onRemoveItem: jest.fn()
		};

		const result = shallow(<StoryTypeList {...stubbedProps} />);
		expect(result).toMatchSnapshot();
	});
});