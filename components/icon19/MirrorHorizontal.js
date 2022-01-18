// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MirrorHorizontal from './svg/MirrorHorizontal.svg';

const MirrorHorizontalIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MirrorHorizontal/>
	</Icon19>;

export default MirrorHorizontalIcon;
