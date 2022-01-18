// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Crop from './svg/Crop.svg';

const CropIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Crop/>
	</Icon19>;

export default CropIcon;
