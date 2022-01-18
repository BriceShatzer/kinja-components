// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import AlignCenter from './svg/Align/AlignCenter.svg';

const AlignCenterIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<AlignCenter/>
	</Icon19>;

export default AlignCenterIcon;
