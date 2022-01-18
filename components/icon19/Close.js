// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Close from './svg/Close/Close.svg';

const CloseIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Close/>
	</Icon19>;

export default CloseIcon;
