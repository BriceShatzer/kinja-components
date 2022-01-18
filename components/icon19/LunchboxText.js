// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxText from './svg/Lunchbox/Lunchbox-Text.svg';

const LunchboxTextIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxText/>
	</Icon19>;

export default LunchboxTextIcon;
