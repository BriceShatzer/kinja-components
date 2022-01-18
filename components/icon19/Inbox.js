// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Inbox from './svg/Inbox.svg';

const InboxIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Inbox/>
	</Icon19>;

export default InboxIcon;
