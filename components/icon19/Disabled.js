// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Disabled from './svg/Disabled.svg';

const DisabledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Disabled/>
	</Icon19>;

export default DisabledIcon;
