// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Loading from './svg/Loading.svg';

const LoadingIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Loading/>
	</Icon19>;

export default LoadingIcon;
