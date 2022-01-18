// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Copyright from './svg/Copyright.svg';

const CopyrightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Copyright/>
	</Icon19>;

export default CopyrightIcon;
