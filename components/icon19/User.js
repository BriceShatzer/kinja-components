// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import User from './svg/User/User.svg';

const UserIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<User/>
	</Icon19>;

export default UserIcon;
