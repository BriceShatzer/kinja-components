// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import OrderPopular from './svg/OrderPopular.svg';

const OrderPopularIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<OrderPopular/>
	</Icon19>;

export default OrderPopularIcon;
