// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import HorizontalRule from './svg/HorizontalRule.svg';

const HorizontalRuleIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<HorizontalRule/>
	</Icon19>;

export default HorizontalRuleIcon;
