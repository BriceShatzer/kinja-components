// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxImageHeadline from './svg/Lunchbox/Lunchbox-ImageHeadline.svg';

const LunchboxImageHeadlineIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxImageHeadline/>
	</Icon19>;

export default LunchboxImageHeadlineIcon;
