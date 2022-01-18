// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeroHeadlineText from './svg/Lunchbox/Lunchbox-HeroHeadlineText.svg';

const LunchboxHeroHeadlineTextIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeroHeadlineText/>
	</Icon19>;

export default LunchboxHeroHeadlineTextIcon;
