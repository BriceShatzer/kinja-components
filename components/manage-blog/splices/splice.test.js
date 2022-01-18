import * as React from 'react';
import { mount } from 'enzyme';

import Splice from './splice';
import PromotedSplice from './promoted-splice';

import post from '../../../__stubs__/stubbedPost.json';


describe('<Splice />', () => {
	const todayTimemillisStub = 1570197900000; // 10/04/2019

	beforeAll(() => {
		jest.spyOn(Date, 'now').mockImplementation(() => todayTimemillisStub);
	});

	it('should render properly', () => {
		const postObject = Object.assign({}, post, { repost: { repostTimeMillis: 1570190748771 }});
		const wrapper = mount(<Splice blog="gizmodo" post={postObject} pageType="manageblog" timezone="America/New_York" />);
		expect(wrapper).toMatchSnapshot();
	});
});

describe('<PromotedSplice />', () => {
	it('should render properly', () => {
		const wrapper = mount(<PromotedSplice />);
		expect(wrapper).toMatchSnapshot();
	});
});
