import * as React from 'react';
import LoadMore from './load-more';

import { mount } from 'enzyme';

import blog from '../../__stubs__/gizmodo.json';

describe('<LoadMore />', () => {
	const stubbedProps = {
		ga: jest.fn(),
		language: 'en',
		pagination: {
			next: {
				startIndex: 1
			}
		},
		blog
	};

	it('adds ?q query param to the load more link if on search page', () => {
		const searchPageProps = {
			...stubbedProps,
			pageType: 'search',
			query: 'my query'
		};

		const wrapper = mount(<LoadMore {...searchPageProps} />);
		expect(wrapper.find('a.js_link').prop('href')).toMatchSnapshot();
	});
});
