// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ChevronUp from './svg/Chevron/ChevronUp.svg';

const ChevronUpIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ChevronUp/>
	</Icon19>;

export default ChevronUpIcon;
