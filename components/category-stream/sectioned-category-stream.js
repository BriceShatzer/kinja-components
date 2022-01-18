/* @flow */

import * as React from 'react';

import {
	CategoryStreamSection,
	StoryTypeBox,
	StoryTypeSelectors
} from './';

import LoadMore from '../stream/load-more';

import type { SectionedCategoryStreamProps } from './types';

import { LdJson, forSectionedStream } from 'kinja-components/components/seo/structured-data';
import getSocialLinks from 'kinja-magma/utils/getSocialLinks';

/*
 * Category (story type, category, subcategory) stream that displays sections of posts.
 */
const SectionedCategoryStream = ({
	blog,
	categories,
	pageType,
	sections,
	storyType,
	subcategories,
	newStaticStreamHeader
}: SectionedCategoryStreamProps): React$Node => {

	return (
		<React.Fragment>
			<StoryTypeBox
				categories={categories}
				storyType={storyType}
				subcategories={subcategories}
				canonicalHost={blog.canonicalHost}
				newStaticStreamHeader={newStaticStreamHeader}
			/>
			<StoryTypeSelectors
				categories={categories}
				storyType={storyType}
				subcategories={subcategories}
			/>

			<LdJson contents={forSectionedStream({
				name: blog.name,
				headline: storyType.title,
				orgUrl: `https://${blog.canonicalHost}`,
				logo: blog.properties && blog.properties.logoLink,
				socialLinks: getSocialLinks(blog.properties),
				sectionItems: sections ? sections.items : []
			})}/>

			<span className="storytype__content">
				{sections && sections.items.map(section => (
					<CategoryStreamSection
						canonical={section.canonical}
						key={section.canonical}
						path={section.path}
						posts={section.posts}
						title={section.title}
						pageType={pageType}
						blogGroup={blog.blogGroup}
						newStaticStreamHeader={false}
					/>
				))}
			</span>

			{sections && <LoadMore
				blog={blog}
				pageType={pageType}
				pagination={sections.pagination}
			/>}
		</React.Fragment>
	);
};

export default SectionedCategoryStream;
