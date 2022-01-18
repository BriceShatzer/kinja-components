// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import CartButton from './svg/CartButton.svg';

const CartButtonIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<CartButton/>
	</Icon19>;

export default CartButtonIcon;
