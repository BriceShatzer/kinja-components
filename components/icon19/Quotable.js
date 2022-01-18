// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Quotable from './svg/Quotable.svg';

const QuotableIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Quotable/>
	</Icon19>;

export default QuotableIcon;
