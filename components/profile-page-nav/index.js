// @flow

import type User from 'kinja-magma/models/User';
import type { FollowCounts } from 'kinja-magma/models/FollowCounts';
import type { ProfilePageViewType } from 'kinja-magma/controllers/profile-page';
import type { TranslateFunction } from 'kinja-components/components/translator';

export type ProfilePageNavProps = {
	user: User,
	followCounts: FollowCounts,
	profilePageView: ProfilePageViewType,
	translate: TranslateFunction,
	isDashboard?: boolean
}

export { ProfilePageNav } from './profile-page-nav';
