// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Eye from './svg/Eye/Eye.svg';

const EyeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Eye/>
	</Icon19>;

export default EyeIcon;
