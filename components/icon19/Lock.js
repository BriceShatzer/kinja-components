// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Lock from './svg/Lock/Lock.svg';

const LockIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Lock/>
	</Icon19>;

export default LockIcon;
