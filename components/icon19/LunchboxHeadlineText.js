// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeadlineText from './svg/Lunchbox/Lunchbox-HeadlineText.svg';

const LunchboxHeadlineTextIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeadlineText/>
	</Icon19>;

export default LunchboxHeadlineTextIcon;
