// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Kinja from './svg/Kinja.svg';

const KinjaIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Kinja/>
	</Icon19>;

export default KinjaIcon;
