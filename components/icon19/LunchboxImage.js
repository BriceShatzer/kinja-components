// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxImage from './svg/Lunchbox/Lunchbox-Image.svg';

const LunchboxImageIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxImage/>
	</Icon19>;

export default LunchboxImageIcon;
