// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import EmbiggenFilled from './svg/Embiggen/EmbiggenFilled.svg';

const EmbiggenFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<EmbiggenFilled/>
	</Icon19>;

export default EmbiggenFilledIcon;
