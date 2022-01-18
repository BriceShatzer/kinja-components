// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Lightning from './svg/Lightning.svg';

const LightningIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Lightning/>
	</Icon19>;

export default LightningIcon;
