// @flow

import SidebarPost from 'kinja-magma/models/SidebarPost';
import type User from 'kinja-magma/models/User';
import type { default as LinkType } from 'kinja-magma/models/Link';

export type CommerceModulePost = {
	post: SidebarPost,
	authors: Array<User>,
	link: LinkType
};
