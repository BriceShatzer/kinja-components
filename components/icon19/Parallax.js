// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Parallax from './svg/Parallax.svg';

const ParallaxIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Parallax/>
	</Icon19>;

export default ParallaxIcon;
