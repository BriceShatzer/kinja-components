// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import GoogleColor from './svg/Google/GoogleColor.svg';

const GoogleColorIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<GoogleColor/>
	</Icon19>;

export default GoogleColorIcon;
