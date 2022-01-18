// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ChevronDown from './svg/Chevron/ChevronDown.svg';

const ChevronDownIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ChevronDown/>
	</Icon19>;

export default ChevronDownIcon;
