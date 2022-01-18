// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LockFilled from './svg/Lock/LockFilled.svg';

const LockFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LockFilled/>
	</Icon19>;

export default LockFilledIcon;
