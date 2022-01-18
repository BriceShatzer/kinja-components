// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Error from './svg/Error/Error.svg';

const ErrorIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Error/>
	</Icon19>;

export default ErrorIcon;
