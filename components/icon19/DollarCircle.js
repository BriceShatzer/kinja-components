// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DollarCircle from './svg/Dollar/Dollar-circle.svg';

const DollarCircleIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DollarCircle/>
	</Icon19>;

export default DollarCircleIcon;
