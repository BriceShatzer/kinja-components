// @flow

import type Post from 'kinja-magma/models/Post';

import { isCommerceUrl } from './checkForCommerceUrl';

export default function assignCommerceSource(post: Post, pageType: string) {

	if (!isCommerceUrl(post.permalink)) {
		return '';
	}

	switch (pageType) {
		case 'frontpage':
		case 'curatedHomepage':
			return post.repost ? 'streamshare' : 'nativestream';
		case 'tag':
			return 'tagpage';
		case 'sectionedCategoryStream':
			return 'storytypepage';
		case 'categoryStream':
			return 'storytypepage';
		case 'search':
			return 'searchpage';
		case 'specialsection':
			return 'specialsection';
	}
}
