// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Linkedin from './svg/Linkedin.svg';

const LinkedinIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Linkedin/>
	</Icon19>;

export default LinkedinIcon;
