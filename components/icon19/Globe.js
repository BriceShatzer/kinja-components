// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Globe from './svg/Globe.svg';

const GlobeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Globe/>
	</Icon19>;

export default GlobeIcon;
