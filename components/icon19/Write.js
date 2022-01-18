// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Write from './svg/Write.svg';

const WriteIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Write/>
	</Icon19>;

export default WriteIcon;
