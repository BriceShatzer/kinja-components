// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ErrorFilled from './svg/Error/Error-filled.svg';

const ErrorFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ErrorFilled/>
	</Icon19>;

export default ErrorFilledIcon;
