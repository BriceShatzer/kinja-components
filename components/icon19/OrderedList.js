// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import OrderedList from './svg/OrderedList.svg';

const OrderedListIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<OrderedList/>
	</Icon19>;

export default OrderedListIcon;
