// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Key from './svg/Key.svg';

const KeyIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Key/>
	</Icon19>;

export default KeyIcon;
