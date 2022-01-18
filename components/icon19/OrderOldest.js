// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import OrderOldest from './svg/OrderOldest.svg';

const OrderOldestIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<OrderOldest/>
	</Icon19>;

export default OrderOldestIcon;
