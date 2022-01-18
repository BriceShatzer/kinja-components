/* @flow */

import type Blog from 'kinja-magma/models/Blog';
import type Post from 'kinja-magma/models/Post';
import type Pagination from 'kinja-magma/models/Pagination';
import type User from 'kinja-magma/models/User';
import type { PostId } from 'kinja-magma/models/Id';
import type { Lookup } from 'kinja-magma/utils/resolve';
import type { PageType } from 'kinja-magma/models/PageType';
import type { KinjaMeta } from 'kinja-components/components/hoc/context';
import type CategoryStreamItem from 'kinja-magma/models/CategoryStreamItem';
import type { CategoryStreamSectionListProperties } from 'kinja-magma/models/CategoryStreamSectionList';

export type CategoryStreamSectionItem = {
	post: Post,
	parentBlog: ?Blog
};

export type CategoryStreamType = {
	// The current blog
	blog: Blog,
	// The list of categories under the story type
	categories: ?Array<CategoryStreamItem>,
	// page type information
	pageType: PageType,
	// story type information
	storyType: CategoryStreamItem,
	// The list of subcategories under the story type and the selected category (if any)
	subcategories: ?Array<CategoryStreamItem>,
	// A lookup object for blogs of all posts
	authors?: Lookup<PostId, User>,
	// Should the deals cards render with excerpt?
	withExcerpt?: boolean,
	// Should show posts with recommended media as large?
	simpleEmbiggen?: boolean,
	newStaticStreamHeader?: boolean
};

export type NonSectionedCategoryStreamType = {
	// category information
	category: ?CategoryStreamItem,
	// Pagination information
	pagination: Pagination,
	// List of post objects
	posts: Array<Post>,
	// subcategory information
	subcategory: ?CategoryStreamItem,
	// Feature Switch for New Static Steam Header
	newStaticStreamHeader?: boolean
};

export type SectionItemType = CategoryStreamItem & {
	posts: Array<Post>
};

/*
 * Props specific to sectioned category stream
 */
export type SectionedCategoryStreamType = {
	// The list of sections to show
	sections: ?CategoryStreamSectionListProperties
};

export type NonSectionedCategoryStreamProps = CategoryStreamType & NonSectionedCategoryStreamType & {
	withExcerpt?: boolean,
	kinjaMeta?: KinjaMeta
};
export type SectionedCategoryStreamProps = CategoryStreamType & SectionedCategoryStreamType;

export type StoryTypeBoxProps = {
	// category information
	category?: ?CategoryStreamItem,
	// story type information
	storyType: CategoryStreamItem,
	// subcategory information
	subcategory?: ?CategoryStreamItem,
	canonicalHost: string,
	// Feature Switch for New Static Steam Header
	newStaticStreamHeader?: boolean
};

export type StoryTypeSelectorsProps = {
	// category information
	category?: ?CategoryStreamItem,
	// The list of categories under the story type
	categories: ?Array<CategoryStreamItem>,
	// The list of subcategories under the story type and the selected category (if any)
	subcategories: ?Array<CategoryStreamItem>,
	// story type information
	storyType: CategoryStreamItem
};

export type CategoryStreamSectionProps = {
	// The full path to be used in URLs.
	path: string,
	// The list of posts in the section.
	posts: ?Array<Post>,
	// The title/display name of the item, to be printed for users.
	title: string,
	pageType: string,
	blogGroup: string,
	newStaticStreamHeader?: boolean
};

export type CategoryStreamSectionItemProps = {
	events?: ?Array<Array<?string | {[key: string]: mixed}>>,
	// the post associated with the item
	post: Post,
	pageType: string,
	withBranding?: boolean,
	blogGroup: ?string,
	noLazy: boolean
};

export type CategorySelectProps = {
	// The default value for the select, either a category or subcategory
	category: ?CategoryStreamItem,
	// The highest level of categorization
	storyType: CategoryStreamItem,
	// The list of values to be used as options for the select
	categories: ?Array<CategoryStreamItem>,
	// Used to decide what the default string value for the select should be,
	// if one is not specified
	selectType: string,
	// Used to redirect the client after selecting a category or subcategory
	redirectHandler?: (string) => void
};
