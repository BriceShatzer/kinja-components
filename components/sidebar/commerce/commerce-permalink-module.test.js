import React from 'react';
import { shallow } from 'enzyme';

import CommercePermalinkModule from './';
import author from 'kinja-components/__stubs__/stubbedAuthorResponse.json';
import gizmodoJSON from 'kinja-components/__stubs__/gizmodo.json';
import post from 'kinja-components/__stubs__/commercePost.json';


describe('<CommercePermalinkModule />', () => {
	const postObj = {post, authors: author};
	const features = jest.fn({ large_commerce_rail: true });
	it('should render', () => {
		const wrapper = shallow(<CommercePermalinkModule
			blog={gizmodoJSON}
			pageType="permalink"
			posts={[postObj]}
			features={features}
		/>);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render when provided with multiple posts', () => {
		const wrapper = shallow(<CommercePermalinkModule
			blog={gizmodoJSON}
			pageType="permalink"
			posts={[postObj,postObj,postObj]}
			features={features}
		/>);
		expect(wrapper).toMatchSnapshot();
	});
});
