import * as React from 'react';
import { render } from 'enzyme';

import BlogLogo from './blog-logo';

describe('<BlogLogo />', () => {
	it('should render avclub logo', () => {
		expect(render(<BlogLogo name="avclub" />)).toMatchSnapshot();
	});

	it('should render avclub logo with forced 2x scale', () => {
		expect(<BlogLogo name="avclub" scale="2" />).toMatchSnapshot();
	});
});
