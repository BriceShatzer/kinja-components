// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import OverlayDark from './svg/OverlayDark.svg';

const OverlayDarkIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<OverlayDark/>
	</Icon19>;

export default OverlayDarkIcon;
