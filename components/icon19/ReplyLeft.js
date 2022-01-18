// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ReplyLeft from './svg/Reply/Reply-left.svg';

const ReplyLeftIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ReplyLeft/>
	</Icon19>;

export default ReplyLeftIcon;
