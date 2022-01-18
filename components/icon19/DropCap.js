// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DropCap from './svg/DropCap.svg';

const DropCapIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DropCap/>
	</Icon19>;

export default DropCapIcon;
