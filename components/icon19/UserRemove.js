// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import UserRemove from './svg/User/UserRemove.svg';

const UserRemoveIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<UserRemove/>
	</Icon19>;

export default UserRemoveIcon;
