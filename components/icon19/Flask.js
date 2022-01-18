// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Flask from './svg/Flask.svg';

const FlaskIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Flask/>
	</Icon19>;

export default FlaskIcon;
