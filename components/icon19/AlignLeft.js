// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import AlignLeft from './svg/Align/AlignLeft.svg';

const AlignLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<AlignLeft/>
	</Icon19>;

export default AlignLeftIcon;
