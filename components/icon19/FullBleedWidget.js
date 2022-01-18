// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import FullBleedWidget from './svg/FullBleedWidget.svg';

const FullBleedWidgetIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<FullBleedWidget/>
	</Icon19>;

export default FullBleedWidgetIcon;
