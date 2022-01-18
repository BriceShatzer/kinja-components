// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowRight from './svg/Arrow/Arrow-right.svg';

const ArrowRightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowRight/>
	</Icon19>;

export default ArrowRightIcon;
