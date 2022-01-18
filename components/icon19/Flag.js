// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Flag from './svg/Flag.svg';

const FlagIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Flag/>
	</Icon19>;

export default FlagIcon;
