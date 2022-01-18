// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeadline from './svg/Lunchbox/Lunchbox-Headline.svg';

const LunchboxHeadlineIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeadline/>
	</Icon19>;

export default LunchboxHeadlineIcon;
