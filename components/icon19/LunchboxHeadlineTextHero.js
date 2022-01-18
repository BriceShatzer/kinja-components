// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeadlineTextHero from './svg/Lunchbox/Lunchbox-HeadlineTextHero.svg';

const LunchboxHeadlineTextHeroIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeadlineTextHero/>
	</Icon19>;

export default LunchboxHeadlineTextHeroIcon;
