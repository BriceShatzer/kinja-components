// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Information from './svg/Information.svg';

const InformationIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Information/>
	</Icon19>;

export default InformationIcon;
