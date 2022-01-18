// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ZoomOut from './svg/Zoom-out.svg';

const ZoomOutIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ZoomOut/>
	</Icon19>;

export default ZoomOutIcon;
