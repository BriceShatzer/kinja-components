// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxTextHero from './svg/Lunchbox/Lunchbox-TextHero.svg';

const LunchboxTextHeroIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxTextHero/>
	</Icon19>;

export default LunchboxTextHeroIcon;
