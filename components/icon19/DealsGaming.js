// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DealsGaming from './svg/Deals/DealsGaming.svg';

const DealsGamingIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DealsGaming/>
	</Icon19>;

export default DealsGamingIcon;
