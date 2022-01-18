// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Minus from './svg/Minus.svg';

const MinusIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Minus/>
	</Icon19>;

export default MinusIcon;
