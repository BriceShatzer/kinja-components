// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import UserAdd from './svg/User/UserAdd.svg';

const UserAddIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<UserAdd/>
	</Icon19>;

export default UserAddIcon;
