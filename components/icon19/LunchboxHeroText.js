// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeroText from './svg/Lunchbox/Lunchbox-HeroText.svg';

const LunchboxHeroTextIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeroText/>
	</Icon19>;

export default LunchboxHeroTextIcon;
