// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ICON_COMPONENT from '.SVG_ICON_PATH';

const ICON_COMPONENTIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ICON_COMPONENT/>
	</Icon19>;

export default ICON_COMPONENTIcon;
