// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import UserAvatar from './svg/User/UserAvatar.svg';

const UserAvatarIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<UserAvatar/>
	</Icon19>;

export default UserAvatarIcon;
