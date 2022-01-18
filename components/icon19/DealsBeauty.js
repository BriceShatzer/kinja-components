// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import DealsBeauty from './svg/Deals/DealsBeauty.svg';

const DealsBeautyIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<DealsBeauty/>
	</Icon19>;

export default DealsBeautyIcon;
