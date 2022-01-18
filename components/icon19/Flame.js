// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Flame from './svg/Flame/Flame.svg';

const FlameIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Flame/>
	</Icon19>;

export default FlameIcon;
