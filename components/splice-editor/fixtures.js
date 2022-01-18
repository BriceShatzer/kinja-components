/* @flow */

import React from 'react';
import Post from 'kinja-magma/models/Post';
import Blog from 'kinja-magma/models/Blog';
import BlogAvatar from '../blog-avatar';

import post from 'kinja-components/__stubs__/stubbedPostResponse.json';
import blog from 'kinja-components/__stubs__/gizmodo.json';


export const currentPost = Post.fromJSON({
	...post,
	...{
		headline: post.headline,
		properties: JSON.stringify({
			...JSON.parse(post.properties),
			...{
				isEmbiggened: true
			}
		})
	}
});

export const currentBlog = Blog.fromJSON({
	...blog,
	...{
		properties: {
			...blog.properties,
			...{
				blogGroup: 'gizmodo'
			}
		}
	}
});


export const selectedBlogs = [
	{
		icon: <BlogAvatar name="gizmodo" size={18} />,
		id: 12,
		name: 'io9',
		parentId: '1'
	},
	{
		icon: <BlogAvatar name="gizmodo" size={18} />,
		id: 13,
		name: 'Paleofuture',
		parentId: '1'
	},
	{
		icon: <BlogAvatar name="thetakeout" size={18} />,
		id: 3,
		name: 'The Takeout'
	},
	{
		icon: <BlogAvatar name="splinter" size={18} />,
		id: 2,
		name: 'Splinter'
	}
];


export const lastSharedBlogs = [
	{
		blogGroup: 'kotaku',
		createTimeMillis: 1552045361570,
		displayName: 'Cosplay',
		id: '1538697436',
		repostTimeMillis: 1553045361570
	},
	{
		blogGroup: 'gizmodo',
		displayName: 'Earther',
		createTimeMillis: 1551045261570,
		id: '1636390014',
		repostTimeMillis: 1553045261570
	},
	{
		blogGroup: 'splinter',
		displayName: 'Splinter',
		createTimeMillis: 1551045261570,
		id: '1635895473',
		repostTimeMillis: 1551245261570
	}
];