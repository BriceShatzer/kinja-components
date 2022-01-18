// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import SharedPost from './svg/SharedPost/SharedPost.svg';

const SharedPostIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<SharedPost/>
	</Icon19>;

export default SharedPostIcon;
