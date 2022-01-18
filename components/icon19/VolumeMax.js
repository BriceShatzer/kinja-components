// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import VolumeMax from './svg/Volume/VolumeMax.svg';

const VolumeMaxIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<VolumeMax/>
	</Icon19>;

export default VolumeMaxIcon;
