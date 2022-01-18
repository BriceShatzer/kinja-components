// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ChevronRight from './svg/Chevron/ChevronRight.svg';

const ChevronRightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ChevronRight/>
	</Icon19>;

export default ChevronRightIcon;
