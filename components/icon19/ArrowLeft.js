// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ArrowLeft from './svg/Arrow/Arrow-left.svg';

const ArrowLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ArrowLeft/>
	</Icon19>;

export default ArrowLeftIcon;
