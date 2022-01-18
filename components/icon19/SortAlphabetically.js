// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import SortAlphabetically from './svg/Sort-alphabetically.svg';

const SortAlphabeticallyIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<SortAlphabetically/>
	</Icon19>;

export default SortAlphabeticallyIcon;
