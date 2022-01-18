// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Center from './svg/Center.svg';

const CenterIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Center/>
	</Icon19>;

export default CenterIcon;
