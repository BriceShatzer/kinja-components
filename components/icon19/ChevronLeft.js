// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ChevronLeft from './svg/Chevron/ChevronLeft.svg';

const ChevronLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ChevronLeft/>
	</Icon19>;

export default ChevronLeftIcon;
