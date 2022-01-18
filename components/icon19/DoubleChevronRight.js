// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DoubleChevronRight from './svg/DoubleChevron/DoubleChevronRight.svg';

const DoubleChevronRightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DoubleChevronRight/>
	</Icon19>;

export default DoubleChevronRightIcon;
