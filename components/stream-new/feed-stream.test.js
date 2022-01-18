import * as React from 'react';
import { mount } from 'enzyme';
import Theme from '../theme';
import Post from 'kinja-magma/models/Post';

import posts from '../../__stubs__/stubbedFrontPagePosts.json';

jest.mock('../ad-slot/ads');
import {
	PromotionNativeAd,
	MobileAd
} from '../ad-slot/ads';

jest.mock('./feed-stream-container');
import { FeedStreamContainer } from './feed-stream-container';

jest.mock('./recent-video-container.js');
import { RecentVideoContainer } from './recent-video-container.js';

jest.mock('../../../postbody/utils/trimExcerpt');
import trimExcerpt from '../../../postbody/utils/trimExcerpt';

jest.mock('./feed-item');
import FeedItem from './feed-item';

import FeedStream from './feed-stream';

trimExcerpt.mockImplementation(() => 'MOCK EXCERPT');

/*
	Mock the container, so it'll be easier to handle in tests.
*/
FeedStreamContainer.render.mockImplementation(({children}) => (<div id='container'>{children}</div>));

/*
	Mock *all* other components rendered by FeedStream.
	Posts (FeedItems) are replaced with <div/> elements, items prepended to posts are <span/>s.
	Element types used in tests have nothing to do with the actual output of these components,
	they're mocked so selectors are easier to write and and snapshots remain human-readable.
*/
FeedItem.mockImplementation(({index}) => (
	<div
		type='post'
		position={`${index}`}
	></div>
));
PromotionNativeAd.mockImplementation(({ppPosition}) => (
	<span
		type='promotion'
		position={`${ppPosition}`}
	></span>
));
RecentVideoContainer.mockImplementation(() => (
	<span
		type='recent video'
	></span>
));
MobileAd.mockImplementation(() => (
	<span
		type='mobile ad'>
	</span>
));

describe('<FeedStream />', () => {

	const indices = {
		instreamNativeAd: [1, 2],
		instreamMobileAd: [0, 1],
		recentVideo: [1]
	};

	const feed = mount(
		<Theme>
			<FeedStream
				posts={posts.items.map(post => Post.fromJSON(post))}
				indices={indices}
			/>
		</Theme>
	);

	it('renders the feed correctly', () => {
		const allItems = feed
			.find('#container')
			.children()
			.map(node => node.html());

		expect(allItems).toHaveLength(
			indices.instreamNativeAd.length +
			indices.instreamMobileAd.length +
			indices.recentVideo.length +
			posts.items.length
		);

		expect(allItems).toMatchSnapshot();
	});

	it('position props of items counted in the stream are are zero-indexed and correct', () => {
		feed
			.find('#container')
			.children()
			.find('div[type="post"]')
			.map((wrapper, index)=> {
				const positionAttrValue = parseInt(
					wrapper
						.getDOMNode()
						.getAttribute('position')
				);
				expect(index).toEqual(positionAttrValue);
			});
	});
});
