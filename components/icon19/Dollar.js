// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Dollar from './svg/Dollar/Dollar.svg';

const DollarIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Dollar/>
	</Icon19>;

export default DollarIcon;
