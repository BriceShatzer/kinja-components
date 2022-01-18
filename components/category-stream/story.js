/* @flow */

import * as React from 'react';
import {
	action,
	select,
	storiesOf,
	withDocs,
	boolean,
	blogGroup
} from 'base-storybook';
import README from './README.md';

import CategoryStream, {
	CategorySelect,
	CategoryStreamSection,
	CategoryStreamSectionItem,
	SectionedCategoryStream,
	StoryTypeBox
} from './';

import LoadMore from '../stream/load-more';
import Theme from '../theme';

import blog1 from '../../__stubs__/gizmodo.json';
import blog2 from '../../__stubs__/stubbedBlog.2.json';
import blog3 from '../../__stubs__/es.gizmodo.json';

import Blog from 'kinja-magma/models/Blog';
import Post from 'kinja-magma/models/Post';
import CategoryStreamModel from 'kinja-magma/models/CategoryStream';

import categoryStream from '../../__stubs__/stubbedCategoryStream.json';
import categoryStreamWithPosts from '../../__stubs__/stubbedSectionedCategoryStream.json';


const blogs = {
	[blog1.displayName]: new Blog(blog1),
	[blog2.displayName]: new Blog(blog2),
	[blog3.displayName]: new Blog(blog3)
};

const blogOptions = [blog1.displayName, blog2.displayName, blog3.displayName];

const stubbedGA = {
	ga: (s1: mixed, s2: mixed, s3: mixed) => action('ga event')(...[s1, s2, s3])
};

storiesOf('4. Components|Post Promotion/Category Stream', module)
	.addDecorator(getStory => (
		<div style={{ maxWidth: '800px', width: '800px' }}>
			<Theme blog={blogGroup()}>
				{getStory()}
			</Theme>
		</div>
	))
	.addDecorator(withDocs(README))
	.add('Category stream (default)', () => {
		const posts = categoryStreamWithPosts.sections.items[0].posts.map(post =>
			Post.fromJSON(post)
		);

		const streamProps = {
			...stubbedGA,
			...categoryStream,
			posts
		};

		return <CategoryStream {...streamProps} />;
	})
	.add('Category stream (sectioned)', () => {
		const categoryStreamWithPostsFromJSON = CategoryStreamModel.fromJSON(categoryStreamWithPosts);
		const sectionedStreamProps = {
			blog: Blog.fromJSON(categoryStreamWithPosts.blog),
			pageType: categoryStreamWithPosts.pageType,
			...stubbedGA,
			...categoryStreamWithPostsFromJSON
		};

		return sectionedStreamProps.sections ? <SectionedCategoryStream {...sectionedStreamProps} /> : null;
	})
	.add('Category stream section item', () => {
		const itemProps = {
			...stubbedGA,
			...categoryStream,
			withBranding: boolean('With branding?', true),
			post: Post.fromJSON(categoryStreamWithPosts.sections.items[0].posts[2]),
			blogGroup: blogGroup()
		};

		return <CategoryStreamSectionItem {...itemProps} />;
	})
	.add('Category stream section', () => {
		// stub override
		const posts = categoryStreamWithPosts.sections.items[0].posts.map(post =>
			Post.fromJSON(post)
		);

		const sectionProps = {
			...stubbedGA,
			...categoryStreamWithPosts.sections.items[0],
			posts
		};

		return <CategoryStreamSection {...sectionProps} />;
	})
	.add('Category selector', () => {
		const selectorProps = {
			selectType: 'Categories',
			redirectHandler: (url: string) => action('redirect')(url),
			...stubbedGA,
			...categoryStream
		};

		return <CategorySelect {...selectorProps} />;
	})
	.add('Load More', () => {
		const blog = blogs[select('blog', blogOptions, blogOptions[0])];

		const pagination = {
			next: {
				startIndex: 0,
				startTime: 0
			}
		};

		const loadMoreProps = {
			...stubbedGA,
			blog,
			pagination
		};
		// $FlowFixMe
		return <LoadMore {...loadMoreProps} />;
	})
	.add('Story type box', () => {
		return <StoryTypeBox {...categoryStream} />;
	});
