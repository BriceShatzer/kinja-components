// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ExpandBackground from './svg/ExpandBackground.svg';

const ExpandBackgroundIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ExpandBackground/>
	</Icon19>;

export default ExpandBackgroundIcon;
