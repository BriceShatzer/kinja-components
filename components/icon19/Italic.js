// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Italic from './svg/Italic.svg';

const ItalicIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Italic/>
	</Icon19>;

export default ItalicIcon;
