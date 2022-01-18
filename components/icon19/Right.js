// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Right from './svg/Right.svg';

const RightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Right/>
	</Icon19>;

export default RightIcon;
