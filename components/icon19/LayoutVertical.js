// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LayoutVertical from './svg/LayoutVertical.svg';

const LayoutVerticalIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LayoutVertical/>
	</Icon19>;

export default LayoutVerticalIcon;
