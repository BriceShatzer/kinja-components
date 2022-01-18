// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import BubbleFilled from './svg/Bubble/BubbleFilled.svg';

const BubbleFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<BubbleFilled/>
	</Icon19>;

export default BubbleFilledIcon;
