// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import BubbleAdd from './svg/Bubble/BubbleAdd.svg';

const BubbleAddIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<BubbleAdd/>
	</Icon19>;

export default BubbleAddIcon;
