// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import OverlayLight from './svg/OverlayLight.svg';

const OverlayLightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<OverlayLight/>
	</Icon19>;

export default OverlayLightIcon;
