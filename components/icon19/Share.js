// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Share from './svg/Share.svg';

const ShareIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Share/>
	</Icon19>;

export default ShareIcon;
