// @flow

import SpliceEditor from './splice-editor';
import Icon19 from 'kinja-components/components/icon19/icon19';
import type { BlogId } from 'kinja-magma/models/Id';

export type Item = {
	id: BlogId,
	name: string,
	icon: React.Element<typeof Icon19>
}

export type VerticalItem = {
	id: BlogId,
	name: string,
	parentId: string,
	icon: React.Element<typeof Icon19>
}

export type ParentBlogItem = {
	hasChildren: boolean,
	icon: React.Element<typeof Icon19>,
	id: BlogId,
	isLastSelection?: boolean,
	isParentSelected: boolean,
	name: string,
	selectedChildren?: Array<VerticalItem>
};

export type LastSharedBlog = {
	blogGroup: string,
	createTimeMillis: number,
	displayName: string,
	id: BlogId,
	repostTimeMillis: number
}

export type ShareModel = {
	isEmbiggened: boolean,
	selectedBlogs: Array<ParentBlogItem | Item>,
	timemillis: number
}

export default SpliceEditor;