// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import TileBackground from './svg/TileBackground.svg';

const TileBackgroundIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<TileBackground/>
	</Icon19>;

export default TileBackgroundIcon;
