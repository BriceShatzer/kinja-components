// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowTopRight from './svg/Arrow/Arrow-top-right.svg';

const ArrowTopRightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowTopRight/>
	</Icon19>;

export default ArrowTopRightIcon;
