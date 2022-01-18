// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Users from './svg/User/Users.svg';

const UsersIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Users/>
	</Icon19>;

export default UsersIcon;
