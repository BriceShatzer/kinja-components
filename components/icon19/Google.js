// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Google from './svg/Google/Google.svg';

const GoogleIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Google/>
	</Icon19>;

export default GoogleIcon;
