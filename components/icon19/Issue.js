// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Issue from './svg/Issue.svg';

const IssueIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Issue/>
	</Icon19>;

export default IssueIcon;
