// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Link from './svg/Link.svg';

const LinkIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Link/>
	</Icon19>;

export default LinkIcon;
