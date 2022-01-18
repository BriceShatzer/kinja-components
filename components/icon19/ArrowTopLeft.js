// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowTopLeft from './svg/Arrow/Arrow-top-left.svg';

const ArrowTopLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowTopLeft/>
	</Icon19>;

export default ArrowTopLeftIcon;
