// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Settings from './svg/Settings.svg';

const SettingsIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Settings/>
	</Icon19>;

export default SettingsIcon;
