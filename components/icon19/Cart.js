// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Cart from './svg/Cart.svg';

const CartIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Cart/>
	</Icon19>;

export default CartIcon;
