// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ExternalLink from './svg/ExternalLink.svg';

const ExternalLinkIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ExternalLink/>
	</Icon19>;

export default ExternalLinkIcon;
