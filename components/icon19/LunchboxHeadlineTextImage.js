// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import LunchboxHeadlineTextImage from './svg/Lunchbox/Lunchbox-HeadlineTextImage.svg';

const LunchboxHeadlineTextImageIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<LunchboxHeadlineTextImage/>
	</Icon19>;

export default LunchboxHeadlineTextImageIcon;
