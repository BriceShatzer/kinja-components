// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Bold from './svg/Bold.svg';

const BoldIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Bold/>
	</Icon19>;

export default BoldIcon;
