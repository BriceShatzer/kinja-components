// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Label from './svg/Label/Label.svg';

const LabelIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Label/>
	</Icon19>;

export default LabelIcon;
