// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import PauseFilled from './svg/Pause/PauseFilled.svg';

const PauseFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<PauseFilled/>
	</Icon19>;

export default PauseFilledIcon;
