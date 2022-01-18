// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowBottom from './svg/Arrow/Arrow-bottom.svg';

const ArrowBottomIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowBottom/>
	</Icon19>;

export default ArrowBottomIcon;
