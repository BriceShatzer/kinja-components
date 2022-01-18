// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DoubleChevronDown from './svg/DoubleChevron/DoubleChevronDown.svg';

const DoubleChevronDownIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DoubleChevronDown/>
	</Icon19>;

export default DoubleChevronDownIcon;
