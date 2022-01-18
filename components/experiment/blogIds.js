import React from 'react';
import BlogAvatar from '../blog-avatar';

export const blogIds = [
	{
		id: 1636027099,
		name: 'AV Club',
		subBlogs: [
			{
				id: 1636140413,
				name: 'AV Film'
			},
			{
				id: 1636140416,
				name: 'TV Club'
			},
			{
				id: 1636140417,
				name: 'AV Music'
			}
		]
	},
	{
		id: 1636577167,
		name: 'Clickhole',
		subBlogs: [
			{
				id: 1636673202,
				name: 'Quizzes'
			},
			{
				id: 1636755963,
				name: 'ResistanceHole'
			}
		]
	}
];

const Verticals = [
	[
		{ name: 'Film', id: '11', parentId: '1' },
		{ name: 'TV Club', id: '12', parentId: '1' },
		{ name: 'Music', id: '13', parentId: '1' },
		{ name: 'Games', id: '14', parentId: '1' },
		{ name: 'AUX', id: '15', parentId: '1' },
		{ name: 'News', id: '16', parentId: '1' }
	],
	[
		{ name: 'Quizzes', id: '21', parentId: '2' },
		{ name: 'ResistanceHole', id: '22', parentId: '2' },
		{ name: 'PatriotHole', id: '23', parentId: '2' }
	],
	[
		{ name: 'The Concourse', id: '31', parentId: '3' }
	]
];

const blogsForMultipleSelection = [
	{ name: 'The A.V. Club', id: '1', icon: <BlogAvatar name="avclub" size={18} />, hasChildren: true, selectedChildren: [], isLastSelection: true },
	{ name: 'Clickhole', id: '2', icon: <BlogAvatar name="clickhole" size={18} />, hasChildren: true, selectedChildren: [], isLastSelection: true },
	{ name: 'Deadspin', id: '3', icon: <BlogAvatar name="deadspin" size={18} />, hasChildren: true, selectedChildren: [], isLastSelection: true }
];

const levelsForMultipleSelection = [
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
	blogsForMultipleSelection,
	Verticals,
	levelsForMultipleSelection
};