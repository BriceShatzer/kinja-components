// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Play from './svg/Play/Play.svg';

const PlayIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Play/>
	</Icon19>;

export default PlayIcon;
