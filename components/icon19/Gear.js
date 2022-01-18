// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Gear from './svg/Gear.svg';

const GearIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Gear/>
	</Icon19>;

export default GearIcon;
