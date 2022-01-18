// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowBottomRight from './svg/Arrow/Arrow-bottom-right.svg';

const ArrowBottomRightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowBottomRight/>
	</Icon19>;

export default ArrowBottomRightIcon;
