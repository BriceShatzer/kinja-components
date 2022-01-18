// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import MailFilled from './svg/Mail/MailFilled.svg';

const MailFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<MailFilled/>
	</Icon19>;

export default MailFilledIcon;
