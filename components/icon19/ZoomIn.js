// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ZoomIn from './svg/ZoomIn.svg';

const ZoomInIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ZoomIn/>
	</Icon19>;

export default ZoomInIcon;
