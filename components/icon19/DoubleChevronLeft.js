// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DoubleChevronLeft from './svg/DoubleChevron/DoubleChevronLeft.svg';

const DoubleChevronLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DoubleChevronLeft/>
	</Icon19>;

export default DoubleChevronLeftIcon;
