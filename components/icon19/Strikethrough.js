// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Strikethrough from './svg/Strikethrough.svg';

const StrikethroughIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Strikethrough/>
	</Icon19>;

export default StrikethroughIcon;
