// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxImageHeadlineText from './svg/Lunchbox/Lunchbox-ImageHeadlineText.svg';

const LunchboxImageHeadlineTextIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxImageHeadlineText/>
	</Icon19>;

export default LunchboxImageHeadlineTextIcon;
