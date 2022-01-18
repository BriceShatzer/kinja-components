// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MoveTop from './svg/Move/Move-top.svg';

const MoveTopIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MoveTop/>
	</Icon19>;

export default MoveTopIcon;
