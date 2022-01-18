// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxTextImage from './svg/Lunchbox/Lunchbox-TextImage.svg';

const LunchboxTextImageIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxTextImage/>
	</Icon19>;

export default LunchboxTextImageIcon;
