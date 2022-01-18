// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Compare from './svg/Compare.svg';

const CompareIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Compare/>
	</Icon19>;

export default CompareIcon;
