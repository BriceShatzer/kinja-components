// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeadlineHero from './svg/Lunchbox/Lunchbox-HeadlineHero.svg';

const LunchboxHeadlineHeroIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeadlineHero/>
	</Icon19>;

export default LunchboxHeadlineHeroIcon;
