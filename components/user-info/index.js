// @flow

import type UserProperty from 'kinja-magma/models/UserProperty';
import type { TranslateFunction } from 'kinja-components/components/translator';
import User from 'kinja-magma/models/User';

export type UserInfoProps = {
	user: User,
	userProperties: Array<UserProperty>,
	translate: TranslateFunction,
	showFollowControlls?: boolean
}

export * from './user-info';
