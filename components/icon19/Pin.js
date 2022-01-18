// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Pin from './svg/Pin.svg';

const PinIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Pin/>
	</Icon19>;

export default PinIcon;
