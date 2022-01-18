// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Heart from './svg/Heart.svg';

const HeartIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Heart/>
	</Icon19>;

export default HeartIcon;
