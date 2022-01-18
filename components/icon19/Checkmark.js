// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Checkmark from './svg/Checkmark.svg';

const CheckmarkIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Checkmark/>
	</Icon19>;

export default CheckmarkIcon;
