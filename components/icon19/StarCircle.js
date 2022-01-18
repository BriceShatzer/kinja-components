// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import StarCircle from './svg/Star/StarCircle.svg';

const StarCircleIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<StarCircle/>
	</Icon19>;

export default StarCircleIcon;
