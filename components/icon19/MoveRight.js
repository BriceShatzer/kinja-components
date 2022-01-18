// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MoveRight from './svg/Move/Move-right.svg';

const MoveRightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MoveRight/>
	</Icon19>;

export default MoveRightIcon;
