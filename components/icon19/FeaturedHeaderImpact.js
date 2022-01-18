// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import FeaturedHeaderImpact from './svg/FeaturedHeader/FeaturedHeaderImpact.svg';

const FeaturedHeaderImpactIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<FeaturedHeaderImpact/>
	</Icon19>;

export default FeaturedHeaderImpactIcon;
