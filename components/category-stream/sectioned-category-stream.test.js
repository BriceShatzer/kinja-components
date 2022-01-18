import * as React from 'react';
import { shallow } from 'enzyme';

import { SectionedCategoryStream } from './';

import stubbedSectionedCategoryStream from '../../__stubs__/stubbedSectionedCategoryStream.json';

describe('<SectionedCategoryStream />', () => {
	it('should render a sectioned category stream', () => {
		const stubbedProps = {
			...stubbedSectionedCategoryStream,
			ga: jest.fn()
		};

		const result = shallow(<SectionedCategoryStream {...stubbedProps} />);
		expect(result).toMatchSnapshot();
	});
});