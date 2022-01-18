// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import InsertModule from './svg/InsertModule.svg';

const InsertModuleIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<InsertModule/>
	</Icon19>;

export default InsertModuleIcon;
