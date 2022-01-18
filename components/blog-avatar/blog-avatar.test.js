import * as React from 'react';
import { render } from 'enzyme';

import BlogAvatar from './blog-avatar';

describe('<BlogAvatar />', () => {
	it('should render avclub avatar', () => {
		expect(render(<BlogAvatar name="avclub" />)).toMatchSnapshot();
	});

	it('should render avclub avatar with the is-anchored class', () => {
		expect(<BlogAvatar name="avclub" anchor/>).toMatchSnapshot();
	});

	it('should render avclub avatar with forced 100px square dimensions', () => {
		expect(<BlogAvatar name="avclub" size={100}/>).toMatchSnapshot();
	});
});
