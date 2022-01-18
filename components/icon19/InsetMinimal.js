// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import InsetMinimal from './svg/InsetMinimal.svg';

const InsetMinimalIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<InsetMinimal/>
	</Icon19>;

export default InsetMinimalIcon;
