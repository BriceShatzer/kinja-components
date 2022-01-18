// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import StarFilled from './svg/Star/StarFilled.svg';

const StarFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<StarFilled/>
	</Icon19>;

export default StarFilledIcon;
