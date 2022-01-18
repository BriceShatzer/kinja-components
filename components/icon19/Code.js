// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Code from './svg/Code.svg';

const CodeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Code/>
	</Icon19>;

export default CodeIcon;
