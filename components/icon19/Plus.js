// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Plus from './svg/Plus.svg';

const PlusIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Plus/>
	</Icon19>;

export default PlusIcon;
