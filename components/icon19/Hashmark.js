// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Hashmark from './svg/Hashmark.svg';

const HashmarkIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Hashmark/>
	</Icon19>;

export default HashmarkIcon;
