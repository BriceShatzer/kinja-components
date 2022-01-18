// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MoveVertical from './svg/Move-vertical.svg';

const MoveVerticalIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MoveVertical/>
	</Icon19>;

export default MoveVerticalIcon;
