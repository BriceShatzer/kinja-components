// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Burner from './svg/Burner.svg';

const BurnerIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Burner/>
	</Icon19>;

export default BurnerIcon;
