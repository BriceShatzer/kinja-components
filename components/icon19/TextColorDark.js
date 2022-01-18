// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import TextColorDark from './svg/TextColor/TextColorDark.svg';

const TextColorDarkIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<TextColorDark/>
	</Icon19>;

export default TextColorDarkIcon;
