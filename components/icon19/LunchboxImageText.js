// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxImageText from './svg/Lunchbox/Lunchbox-ImageText.svg';

const LunchboxImageTextIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxImageText/>
	</Icon19>;

export default LunchboxImageTextIcon;
