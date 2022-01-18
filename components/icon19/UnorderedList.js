// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import UnorderedList from './svg/UnorderedList.svg';

const UnorderedListIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<UnorderedList/>
	</Icon19>;

export default UnorderedListIcon;
