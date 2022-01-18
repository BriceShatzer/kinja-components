// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Bleed from './svg/Bleed.svg';

const BleedIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Bleed/>
	</Icon19>;

export default BleedIcon;
