// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowTop from './svg/Arrow/Arrow-top.svg';

const ArrowTopIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowTop/>
	</Icon19>;

export default ArrowTopIcon;
