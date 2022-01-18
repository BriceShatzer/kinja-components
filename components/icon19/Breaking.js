// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Breaking from './svg/Breaking.svg';

const BreakingIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Breaking/>
	</Icon19>;

export default BreakingIcon;
