import * as React from 'react';
import { mount } from 'enzyme';
import { parseNode } from 'postbody/BlockNode';

import Excerpt from './excerpt';

import shortFeedItem from '../../../__stubs__/stubbedStreamPost.json';
jest.mock('shortid', () => ({ count: 0, generate() { return `shortkey-${++this.count}`; }}));

describe('<Excerpt />', () => {
	it('should render properly', () => {
		const wrapper = mount(
			<Excerpt blog="earther" postBody={[parseNode(shortFeedItem.post.body[1])]} />
		);
		expect(wrapper).toMatchSnapshot();
	});
});
