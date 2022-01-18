// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import FeaturedHeaderClassic from './svg/FeaturedHeader/FeaturedHeaderClassic.svg';

const FeaturedHeaderClassicIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<FeaturedHeaderClassic/>
	</Icon19>;

export default FeaturedHeaderClassicIcon;
