// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import EyeFilled from './svg/Eye/EyeFilled.svg';

const EyeFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<EyeFilled/>
	</Icon19>;

export default EyeFilledIcon;
