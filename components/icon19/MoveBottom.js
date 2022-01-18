// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MoveBottom from './svg/Move/Move-bottom.svg';

const MoveBottomIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MoveBottom/>
	</Icon19>;

export default MoveBottomIcon;
