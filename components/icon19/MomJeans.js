// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MomJeans from './svg/MomJeans.svg';

const MomJeansIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MomJeans/>
	</Icon19>;

export default MomJeansIcon;
