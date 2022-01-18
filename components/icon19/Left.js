// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Left from './svg/Left.svg';

const LeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Left/>
	</Icon19>;

export default LeftIcon;
