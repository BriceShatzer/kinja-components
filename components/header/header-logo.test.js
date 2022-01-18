import React from 'react';
import { mount } from 'enzyme';

import HeaderLogo from './header-logo';
import HeaderTitle from './header-title';
import BlogLogo from '../blog-logo';

describe('Header logo', () => {
	it('should render kinja logo there is no blog and no title', () => {
		const wrapper = mount(<HeaderLogo/>);
		expect(wrapper).toMatchSnapshot();
	});

	it('should render title if it\'s a page with title', () => {
		const wrapper = mount(
			<HeaderLogo
				title="Title"
			/>
		);

		expect(wrapper.find(HeaderTitle)).toHaveLength(1);
	});

	it('should render blog logo if it\'s a main blog', () => {
		const wrapper = mount(
			<HeaderLogo
				blog={{
					name: 'gizmodo',
					blogGroup: 'gizmodo'
				}}
			/>
		);

		expect(wrapper.find(BlogLogo)).toHaveLength(1);
	});
});
