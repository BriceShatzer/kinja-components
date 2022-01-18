import * as React from 'react';
import { shallow } from 'enzyme';

import FooterNetwork from './footerNetwork';

import { NETWORK_BLOGS } from '../../../config/consts';

describe('<FooterNetwork />', () => {
	describe('renders a link to each blog in the network', () => {
		const props = { NETWORK_BLOGS };
		const wrapper = shallow(<FooterNetwork {...props} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('doesn\'t render a network link to the current blog', () => {
		const currentBlog = NETWORK_BLOGS[0];
		const wrapper = shallow(<FooterNetwork blogGroup={currentBlog.name} networkBlogs={NETWORK_BLOGS} />);

		expect(wrapper).toMatchSnapshot();
	});
});
