// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DealsTop from './svg/Deals/DealsTop.svg';

const DealsTopIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DealsTop/>
	</Icon19>;

export default DealsTopIcon;
