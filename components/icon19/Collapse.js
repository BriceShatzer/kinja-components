// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Collapse from './svg/Collapse.svg';

const CollapseIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Collapse/>
	</Icon19>;

export default CollapseIcon;
