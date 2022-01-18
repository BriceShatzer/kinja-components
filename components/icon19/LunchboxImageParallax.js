// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxImageParallax from './svg/Lunchbox/Lunchbox-ImageParallax.svg';

const LunchboxImageParallaxIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxImageParallax/>
	</Icon19>;

export default LunchboxImageParallaxIcon;
