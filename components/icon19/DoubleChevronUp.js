// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DoubleChevronUp from './svg/DoubleChevron/DoubleChevronUp.svg';

const DoubleChevronUpIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DoubleChevronUp/>
	</Icon19>;

export default DoubleChevronUpIcon;
