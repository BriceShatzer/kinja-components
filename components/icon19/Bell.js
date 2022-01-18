// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Bell from './svg/Bell.svg';

const BellIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Bell/>
	</Icon19>;

export default BellIcon;
