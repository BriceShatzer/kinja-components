/* @flow */

import * as React from 'react';
import {
	storiesOf,
	withDocs,
	blogGroup
} from 'base-storybook';
import { TextNode, LinkNode } from 'postbody/InlineNode';
import { RoundupItem } from 'postbody/blockNodes/Roundup';
import KinjaRoundup from './kinja-roundup';

import stubbedPost from 'kinja-components/__stubs__/stubbedPost.json';
import stubbedBlog from 'kinja-components/__stubs__/stubbedBlog.2.json';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';

import Theme from '../theme';

import README from './README.md';

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

storiesOf('4. Components|KinjaRoundup', module)
	.addDecorator(withDocs(README))
	.add('Roundup Editor', () => (
		<Theme blog={blogGroup()}>
			<KinjaRoundup externalAPI={externalAPI} {...props}/>
		</Theme>
	));
