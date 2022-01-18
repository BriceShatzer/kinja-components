// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Logout from './svg/Logout.svg';

const LogoutIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Logout/>
	</Icon19>;

export default LogoutIcon;
