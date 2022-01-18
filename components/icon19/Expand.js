// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Expand from './svg/Expand.svg';

const ExpandIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Expand/>
	</Icon19>;

export default ExpandIcon;
