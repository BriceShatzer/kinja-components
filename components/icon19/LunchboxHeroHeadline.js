// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeroHeadline from './svg/Lunchbox/Lunchbox-HeroHeadline.svg';

const LunchboxHeroHeadlineIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeroHeadline/>
	</Icon19>;

export default LunchboxHeroHeadlineIcon;
