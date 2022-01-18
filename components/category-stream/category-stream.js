/* @flow */

import * as React from 'react';

import {
	StoryTypeBox,
	StoryTypeSelectors
} from './';

import LoadMore from '../stream/load-more';

import { FeedStream } from '../stream-new';

import getSocialLinks from 'kinja-magma/utils/getSocialLinks';

import { LdJson, forStream } from 'kinja-components/components/seo/structured-data';

import type { NonSectionedCategoryStreamProps } from './types';

/*
 * Category (story type, category, subcategory) stream that displays a post list.
 */
const CategoryStream = ({
	blog,
	categories,
	category,
	pageType,
	pagination,
	posts,
	subcategories,
	storyType,
	subcategory,
	authors,
	kinjaMeta,
	withExcerpt,
	simpleEmbiggen
}: NonSectionedCategoryStreamProps): React$Node => {
	const categoryStreamItem = subcategory || category || storyType;

	return (
		<React.Fragment>
			<StoryTypeBox
				category={category}
				storyType={storyType}
				subcategory={subcategory}
				canonicalHost={blog.canonicalHost}
			/>
			<StoryTypeSelectors
				categories={categories}
				category={category}
				storyType={storyType}
				subcategories={subcategories}
			/>

			<LdJson contents={forStream({
				name: blog.name,
				headline: categoryStreamItem.title,
				orgUrl: `https://${blog.canonicalHost}`,
				logo: blog.properties && blog.properties.logoLink,
				socialLinks: getSocialLinks(blog.properties),
				posts
			})}/>

			<FeedStream
				authors={authors}
				blog={blog}
				isV2
				isV3={false}
				kinjaMeta={kinjaMeta}
				pageType={pageType}
				posts={posts}
				simpleEmbiggen={simpleEmbiggen}
				withExcerpt={withExcerpt}
				withAuthorAvatar
			/>

			<LoadMore
				blog={blog}
				pageType={pageType}
				pagination={pagination}
			/>
		</React.Fragment>
	);
};

export default CategoryStream;
