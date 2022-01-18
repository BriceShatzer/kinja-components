// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowBottomLeft from './svg/Arrow/Arrow-bottom-left.svg';

const ArrowBottomLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowBottomLeft/>
	</Icon19>;

export default ArrowBottomLeftIcon;
