// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Rotate from './svg/Rotate.svg';

const RotateIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Rotate/>
	</Icon19>;

export default RotateIcon;
