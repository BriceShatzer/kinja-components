// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeadlineImage from './svg/Lunchbox/Lunchbox-HeadlineImage.svg';

const LunchboxHeadlineImageIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeadlineImage/>
	</Icon19>;

export default LunchboxHeadlineImageIcon;
