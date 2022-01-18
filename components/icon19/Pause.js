// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Pause from './svg/Pause/Pause.svg';

const PauseIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Pause/>
	</Icon19>;

export default PauseIcon;
