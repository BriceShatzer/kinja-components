// @flow

import React from 'react';
import {
	action,
	storiesOf,
	withDocs,
	number,
	select
} from 'base-storybook';

import Trending from './trending';
import SidebarPost from 'kinja-magma/models/SidebarPost';
import Blog from 'kinja-magma/models/Blog';

import gizmodoJSON from '../../../__stubs__/gizmodo.json';
import posts from '../__fixtures__/trending-posts';

import README from './README.md';


const globalProps = actionFn => ({
	// Mock Google Analytics
	ga: (...rest) => {
		actionFn('HOC(Analytics)')(...rest);
		return false;
	}
});

storiesOf('4. Components|Post Promotion/Sidebar', module)
	.addDecorator(withDocs(README))
	.add('Trending', () => {
		const maxPosts = number('Maximum displayed posts', 3);
		const postRefs = {};
		const selectOptionLabels = {};
		const postsToRender = [];

		posts.forEach(post => {
			postRefs[post.id] = post;
			// cleanup headlines
			const div = document.createElement('div');
			div.innerHTML = post.headline;
			selectOptionLabels[post.id] = div.innerText;
		});

		for (let i = 0; i < maxPosts; i++) {
			const trendingStory = i + 1;
			const label = 'Story #' + trendingStory;
			const knobValue = select(label,selectOptionLabels, '1823997019' ,'story' + trendingStory);
			const post = Object.create(postRefs[knobValue]);
			post.id = (post.id * 1) + i ; // hack to stop react from yelling about dup keys
			postsToRender[i] = post;
		}

		return (<div style={{ maxWidth: 360 }}>
			<Trending
				posts={postsToRender.map(post => SidebarPost.fromJSON(post))}
				currentBlog={Blog.fromJSON(gizmodoJSON)}
				maxPosts={maxPosts}
				{...globalProps(action)}
			/>

		</div>);
	});
