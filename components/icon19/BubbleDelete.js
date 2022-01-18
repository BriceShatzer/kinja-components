// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import BubbleDelete from './svg/Bubble/BubbleDelete.svg';

const BubbleDeleteIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<BubbleDelete/>
	</Icon19>;

export default BubbleDeleteIcon;
