// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DealsTech from './svg/Deals/DealsTech.svg';

const DealsTechIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DealsTech/>
	</Icon19>;

export default DealsTechIcon;
