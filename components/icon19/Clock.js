// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Clock from './svg/Clock/Clock.svg';

const ClockIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Clock/>
	</Icon19>;

export default ClockIcon;
