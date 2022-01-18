// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Hamburger from './svg/Hamburger/Hamburger.svg';

const HamburgerIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Hamburger/>
	</Icon19>;

export default HamburgerIcon;
