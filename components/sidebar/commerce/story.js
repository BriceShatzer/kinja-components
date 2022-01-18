// @flow

import React from 'react';
import {
	boolean,
	storiesOf,
	withDocs
} from 'base-storybook';

import CommercePermalinkModule from './';
import Blog from 'kinja-magma/models/Blog';
import Link from 'kinja-magma/models/Link';
import SidebarPost from 'kinja-magma/models/SidebarPost';
import author from 'kinja-components/__stubs__/stubbedAuthorResponse.json';
import gizmodoJSON from 'kinja-components/__stubs__/gizmodo.json';
import post from 'kinja-components/__stubs__/commercePost.json';
import linkJSON from 'kinja-components/__stubs__/stubbedLink.json';

import README from './README.md';

storiesOf('4. Components|Post Promotion/Sidebar', module)
	.addDecorator(withDocs(README))
	.add('Commerce', () => {
		const postObj = {
			post: SidebarPost.fromPost(post,Blog.fromJSON(gizmodoJSON)),
			authors: [author],
			link: Link.fromJSON(linkJSON)
		};
		const posts = [postObj, postObj];
		const isLargeCommerceRail = boolean('Large unit', true);
		const useAmazonLinks = boolean('Use Amazon Link data, if it is there', false);

		return (
			<div style={{ width: '410px' }}>
				<CommercePermalinkModule
					blog={Blog.fromJSON(gizmodoJSON)}
					pageType="permalink"
					posts={posts}
					isLargeCommerceRail={isLargeCommerceRail}
					useAmazonLinks={useAmazonLinks}
				/>
			</div>
		);
	});
