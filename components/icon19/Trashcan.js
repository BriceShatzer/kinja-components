// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Trashcan from './svg/Trashcan.svg';

const TrashcanIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Trashcan/>
	</Icon19>;

export default TrashcanIcon;
