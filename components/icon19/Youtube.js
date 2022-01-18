// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Youtube from './svg/Youtube.svg';

const YoutubeIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Youtube/>
	</Icon19>;

export default YoutubeIcon;
