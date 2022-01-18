// @flow

import type { Autofill } from 'kinja-magma/models/CurationBlock';
import { blogByHost } from 'kinja-magma/api/profile';
import { getStoryType, getCategory } from 'kinja-magma/api/categorization';
import { createStoryTypeId } from 'kinja-magma/models/Id';

export default async function parseFeed(url: string): Promise<Autofill | null> {
	let parsedUrl;
	try {
		parsedUrl = new URL(url);
	} catch (err) {
		return null;
	}
	const type = parsedUrl.pathname.substr(1).split('/');
	const blogId = await blogByHost(parsedUrl.hostname)
		.then(blogResponse => blogResponse.id)
		.catch(() => null);
	if (!blogId) {
		return null;
	}
	switch (type[0]) {
		case '':
			return {
				type: 'BlogAutofill',
				blogId
			};
		case 'tag':
			if (!type[1]) {
				return null;
			}
			return {
				type: 'TagAutofill',
				blogId,
				tagCanonical: type[1]
			};
		case 'c': {
			const storyType = type[1];
			const category = type[2];
			const subCategory = type[3];
			if (!storyType) {
				return null;
			}
			if (storyType && !category) {
				// Storytype
				return getStoryType({ blogId, storyType })
					.then(results => ({
						type: 'StoryTypeAutofill',
						storyTypeId: createStoryTypeId(results.id)
					}))
					.catch(() => null);
			}
			if (storyType && category && !subCategory) {
				// Category
				return getCategory({ blogId, storyType, category })
					.then(results => ({
						type: 'CategoryAutofill',
						categoryId: results.id
					}))
					.catch(() => null);
			}
			if (storyType && category && subCategory) {
				// Category
				return getCategory({ blogId, storyType, category: subCategory, parent: category })
					.then(results => ({
						type: 'CategoryAutofill',
						categoryId: results.id
					}))
					.catch(() => null);
			}
			return null;
		}
		default:
			return null;

	}
}