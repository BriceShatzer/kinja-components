import * as React from 'react';
import { shallow } from 'enzyme';

import CategoryStream from './';

import stubbedCategoryStream from '../../__stubs__/stubbedCategoryStream.json';
import stubbedPost from '../../__stubs__/stubbedPost.json';

describe('<CategoryStream />', () => {
	it('should render a category stream', () => {
		const stubbedProps = {
			...stubbedCategoryStream,
			posts: [stubbedPost],
			ga: jest.fn()
		};

		const result = shallow(<CategoryStream {...stubbedProps} />);
		expect(result).toMatchSnapshot();
	});
});
