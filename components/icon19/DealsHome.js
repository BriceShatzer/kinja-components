// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DealsHome from './svg/Deals/DealsHome.svg';

const DealsHomeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DealsHome/>
	</Icon19>;

export default DealsHomeIcon;
