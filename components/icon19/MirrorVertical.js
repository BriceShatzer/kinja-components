// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MirrorVertical from './svg/MirrorVertical.svg';

const MirrorVerticalIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MirrorVertical/>
	</Icon19>;

export default MirrorVerticalIcon;
