// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import PlayFilled from './svg/Play/PlayFilled.svg';

const PlayFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<PlayFilled/>
	</Icon19>;

export default PlayFilledIcon;
