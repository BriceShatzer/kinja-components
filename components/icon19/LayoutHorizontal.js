// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LayoutHorizontal from './svg/LayoutHorizontal.svg';

const LayoutHorizontalIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LayoutHorizontal/>
	</Icon19>;

export default LayoutHorizontalIcon;
