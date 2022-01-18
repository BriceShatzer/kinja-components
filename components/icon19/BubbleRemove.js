// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import BubbleRemove from './svg/Bubble/BubbleRemove.svg';

const BubbleRemoveIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<BubbleRemove/>
	</Icon19>;

export default BubbleRemoveIcon;
