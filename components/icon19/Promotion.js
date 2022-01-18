// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Promotion from './svg/Promotion/Promotion.svg';

const PromotionIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Promotion/>
	</Icon19>;

export default PromotionIcon;
