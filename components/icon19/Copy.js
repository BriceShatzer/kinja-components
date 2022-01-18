// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Copy from './svg/Copy.svg';

const CopyIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Copy/>
	</Icon19>;

export default CopyIcon;
