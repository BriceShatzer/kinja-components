// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Star from './svg/Star/Star.svg';

const StarIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Star/>
	</Icon19>;

export default StarIcon;
