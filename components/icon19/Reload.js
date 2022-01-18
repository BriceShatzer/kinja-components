// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Reload from './svg/Reload.svg';

const ReloadIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Reload/>
	</Icon19>;

export default ReloadIcon;
