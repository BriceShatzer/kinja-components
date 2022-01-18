// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Fullscreen from './svg/Fullscreen.svg';

const FullscreenIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Fullscreen/>
	</Icon19>;

export default FullscreenIcon;
