// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Pencil from './svg/Pencil.svg';

const PencilIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Pencil/>
	</Icon19>;

export default PencilIcon;
