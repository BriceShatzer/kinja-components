/* @flow */

import * as React from 'react';
import { shallow } from 'enzyme';

import AuthorBio from './author-bio';
import { props } from './stub.js';

describe('<AuthorBio />', () => {
	it('should render AuthorBio by default', () => {
		const wrapper = shallow(<AuthorBio {...props} />);
		expect(wrapper).toMatchSnapshot();
	});
});
