// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Login from './svg/Login.svg';

const LoginIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Login/>
	</Icon19>;

export default LoginIcon;
