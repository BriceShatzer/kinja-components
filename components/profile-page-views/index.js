// @flow

import type { Lookup } from 'kinja-magma/utils/resolve';
import type Pagination from 'kinja-magma/models/Pagination';
import type Post from 'kinja-magma/models/Post';
import type Blog from 'kinja-magma/models/Blog';
import type { UserFollow } from 'kinja-magma/models/UserFollow';
import type { FeatureType } from 'kinja-magma/models/Feature';
import type User from 'kinja-magma/models/User';
import type { PostId } from 'kinja-magma/models/Id';

export type ProfilePagePostsViewProps = {|
	authors: Lookup<PostId, User>,
	posts: Array<Post>,
	repostBlogs?: Lookup<PostId, Blog>,
	pagination: ?Pagination,
	emptyMessage: string,
	feature: FeatureType
|}

export type ProfilePageUserFollowsViewProps = {|
	userFollows: Array<UserFollow>,
	pagination: ?Pagination,
	emptyMessage: string,
	loadMoreMessage: string,
	feature: FeatureType
|}

export { ProfilePagePostsView } from './profile-page-posts-view';
export { ProfilePageUserFollowsView } from './profile-page-userfollows-view';
export { ProfilePageNotificationsView } from './profile-page-notifications-view';
