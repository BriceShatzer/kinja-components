// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ReplyRight from './svg/Reply/Reply-right.svg';

const ReplyRightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ReplyRight/>
	</Icon19>;

export default ReplyRightIcon;
