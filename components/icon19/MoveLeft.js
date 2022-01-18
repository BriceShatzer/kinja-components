// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MoveLeft from './svg/Move/Move-left.svg';

const MoveLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MoveLeft/>
	</Icon19>;

export default MoveLeftIcon;
