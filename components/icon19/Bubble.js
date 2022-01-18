// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Bubble from './svg/Bubble/Bubble.svg';

const BubbleIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Bubble/>
	</Icon19>;

export default BubbleIcon;
