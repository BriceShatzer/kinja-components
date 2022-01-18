// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Image from './svg/Image.svg';

const ImageIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Image/>
	</Icon19>;

export default ImageIcon;
