// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import EmbedThumb from './svg/EmbedThumb.svg';

const EmbedThumbIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<EmbedThumb/>
	</Icon19>;

export default EmbedThumbIcon;
