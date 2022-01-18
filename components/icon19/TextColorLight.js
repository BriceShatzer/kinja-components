// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import TextColorLight from './svg/TextColor/TextColorLight.svg';

const TextColorLightIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<TextColorLight/>
	</Icon19>;

export default TextColorLightIcon;
