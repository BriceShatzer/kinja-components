// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ExternalLinkError from './svg/ExternalLinkError.svg';

const ExternalLinkErrorIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ExternalLinkError/>
	</Icon19>;

export default ExternalLinkErrorIcon;
