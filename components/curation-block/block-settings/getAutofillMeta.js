// @flow

import { createCategoryId, createStoryTypeId, createBlogId } from 'kinja-magma/models/Id';
import { type Autofill } from 'kinja-magma/models/CurationBlock';
import { getBlog } from 'kinja-magma/api/profile';
import { getCategoryById, getStoryTypeById, tagByCanonical } from 'kinja-magma/api/categorization';

export default async function getAutofillData(autofill: Autofill): Promise<{
	url: string,
	title: string
}> {
	switch (autofill.type) {
		case 'BlogAutofill':
			return getBlog(autofill.blogId).then(blog => ({
				url: `https://${blog.canonicalHost}`,
				title: blog.displayName
			}));
		case 'TagAutofill':
			return Promise.all([
				getBlog(autofill.blogId),
				tagByCanonical({ tag: autofill.tagCanonical })
			]).then(([blog, tag]) => ({
				url: `https://${blog.canonicalHost}/tag/${tag.urlName}`,
				title: tag.displayName
			}));
		case 'CategoryAutofill': {
			const autofillCategory = await getCategoryById(autofill.categoryId);
			const parentCategory = await(autofillCategory.parentId ? getCategoryById(createCategoryId(autofillCategory.parentId)) : Promise.resolve(null));
			const category = parentCategory || autofillCategory;
			const subcategory = parentCategory ? autofillCategory : null;
			const storyType = await getStoryTypeById(createStoryTypeId(category.storyTypeId));
			const blog = await getBlog(createBlogId(storyType.blogId));
			return {
				url: `https://${blog.canonicalHost}/c/${storyType.canonical}/${category.canonicalName}${subcategory ? `/${subcategory.canonicalName}` : ''}`,
				title: autofillCategory.displayName
			};
		}
		case 'StoryTypeAutofill': {
			const storyType = await getStoryTypeById(autofill.storyTypeId);
			const blog = await getBlog(createBlogId(storyType.blogId));
			return {
				url: `https://${blog.canonicalHost}/c/${storyType.canonical}`,
				title: storyType.title
			};
		}
		default:
			(autofill.type: empty);
			throw new Error('Unexpected autofill type');
	}
}