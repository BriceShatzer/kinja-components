// @flow

import React from 'react';
import BlogAvatar from '../blog-avatar';
import type {Item, ItemId, Level} from './types';

const level1Selection: ItemId = '1';
const level2Selection: ItemId = '2';
const level3Selection: ItemId = '1';

const blogItemGizmodo: Item = {name: 'Giz', id: level1Selection, icon: <BlogAvatar name="gizmodo" size={18} />};
const blogItemAVClub: Item = {name: 'AV', id: '2'};

const blogs = [
	{...blogItemGizmodo},
	{...blogItemAVClub}
];

const storyTypes = [
	{name: 'Some story type', id: '1'},
	{name: 'Some other story type', id: level2Selection}
];

const categories = [
	{name: 'Some category', id: level3Selection},
	{name: 'Some other category with a really long name', id: '2'}
];

const subcategories = [
	{name: 'Some subcategory', id: '1'},
	{name: 'Some other subcategory', id: '2'}
];

const levels: Array<Level> = [
	{
		id: 'blogs',
		displayName: 'Blogs',
		getItems: () => Promise.resolve(blogs),
		items: blogs,
		selection: level1Selection,
		required: true
	},
	{
		id: 'storyTypes',
		displayName: 'Story Types',
		getItems: () => Promise.resolve(storyTypes),
		items: storyTypes,
		selection: level2Selection
	},
	{
		id: 'categories',
		displayName: 'Categories',
		getItems: () => Promise.resolve(categories),
		items: categories,
		selection: level3Selection
	},
	{
		id: 'subcategories',
		displayName: 'Sub-categories',
		getItems: () => Promise.resolve(subcategories)
	}
];

// Multiple Selection
const blogsForMultipleSelection = [
	{ name: 'Gizmodo', id: '1', icon: <BlogAvatar name="gizmodo" size={18} />, hasChildren: true, selectedChildren: [], isLastSelection: true },
	{ name: 'Splinter', id: '2', icon: <BlogAvatar name="splinter" size={18} />, hasChildren: true, selectedChildren: [], isLastSelection: true },
	{ name: 'The Takeout', id: '3', icon: <BlogAvatar name="thetakeout" size={18} />, selectedChildren: [], isLastSelection: true }
];

const blogItemTheTakeout = {
	icon: <BlogAvatar name="thetakeout" size={18} />,
	id: '3',
	isLastSelection: true,
	name: 'The Takeout',
	selectedChildren: []
};

const Verticals = [
	[
		{ name: 'Earther', id: '11', parentId: '1' },
		{ name: 'io9', id: '12', parentId: '1' },
		{ name: 'Paleofuture', id: '13', parentId: '1' }
	],
	[
		{ name: 'Offspring', id: '21', parentId: '2' },
		{ name: 'Skillet', id: '22', parentId: '2' },
		{ name: 'Two Cents', id: '23', parentId: '2' },
		{ name: 'Vitals', id: '24', parentId: '2' }
	],
	[]
];

const levelsForMultipleSelection: Array<Level> = [
	{
		id: 'parentBlog',
		displayName: 'Parent Blog',
		getItems: () => Promise.resolve(blogsForMultipleSelection),
		items: blogsForMultipleSelection,
		required: false
	},
	{
		id: 'verticals',
		displayName: 'Verticals',
		getItems: id => id ? Promise.resolve(Verticals[parseInt(id) - 1]) : Promise.resolve([])
	}
];

export {
	blogItemGizmodo,
	blogItemAVClub,
	blogItemTheTakeout,
	blogsForMultipleSelection,
	levels,
	levelsForMultipleSelection
};
