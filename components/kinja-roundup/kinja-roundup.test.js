/* @flow */

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import KinjaRoundup from './kinja-roundup';

import stubbedPost from 'kinja-components/__stubs__/stubbedPost.json';
import stubbedBlog from 'kinja-components/__stubs__/stubbedBlog.2.json';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';

import { TextNode, LinkNode } from 'postbody/InlineNode';
import { RoundupItem } from 'postbody/blockNodes/Roundup';

const externalAPI = {
	getPost: () => new Promise(resolve => resolve(Post.fromJSON(stubbedPost))),
	getBlog: () => new Promise(resolve => resolve(Blog.fromJSON(stubbedBlog))),
	updatePostModel: () => {}
};

const props = {
	data: [
		new RoundupItem(
			new LinkNode(
				[new TextNode('Ditch The Dating Apps: 5 Real-Life Places To Meet My Wife')],
				'https://www.clickhole.com/ditch-the-dating-apps-5-real-life-places-to-meet-my-wi-1832472134'
			),
			new TextNode('ClickHole')
		),
		new RoundupItem(
			new LinkNode(
				[new TextNode('Tips For Playing Anthem')],
				'https://kotaku.com/tips-for-playing-anthem-1832821302'
			),
			new TextNode('Kotaku')
		)
	]
};

describe('<KinjaRoundup />', () => {
	it('should render by default', () => {
		const wrapper = shallow(<KinjaRoundup
			externalAPI={externalAPI}
			{...props} />);
		expect(wrapper).toMatchSnapshot();
	});

	it('should call getPost when inserted', () => {
		const getPostHandler = jest.fn();
		externalAPI.getPost = getPostHandler;

		const roundup = mount(<KinjaRoundup externalAPI={externalAPI} data={[]}/>);
		expect(roundup.find('input').length).toEqual(5);

		// $FlowFixMe
		roundup.find('input').first().getDOMNode().value = 'https://kotaku.com/tips-for-playing-anthem-1832821302';
		roundup.find('input').first().simulate('change');

		expect(externalAPI.getPost).toHaveBeenCalledWith({id: 1832821302});
	});

	it('saveItems should call updatePostModel with the correct items', () => {
		const handler = jest.fn();
		externalAPI.updatePostModel = handler;

		const roundup = mount(<KinjaRoundup externalAPI={externalAPI} {...props} />);
		// $FlowFixMe
		roundup.instance().saveItems();

		expect(externalAPI.updatePostModel).toHaveBeenCalledWith(props.data);
	});
});
