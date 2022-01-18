// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Ellipsis from './svg/Ellipsis.svg';

const EllipsisIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Ellipsis/>
	</Icon19>;

export default EllipsisIcon;
