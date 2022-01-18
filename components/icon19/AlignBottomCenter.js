// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import AlignBottomCenter from './svg/Align/AlignBottomCenter.svg';

const AlignBottomCenterIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<AlignBottomCenter/>
	</Icon19>;

export default AlignBottomCenterIcon;
