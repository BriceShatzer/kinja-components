// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Home from './svg/Home.svg';

const HomeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Home/>
	</Icon19>;

export default HomeIcon;
