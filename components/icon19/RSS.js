// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import RSS from './svg/RSS.svg';

const RSSIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<RSS/>
	</Icon19>;

export default RSSIcon;
