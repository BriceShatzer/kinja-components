// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Mail from './svg/Mail/Mail.svg';

const MailIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Mail/>
	</Icon19>;

export default MailIcon;
