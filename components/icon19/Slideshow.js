// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Slideshow from './svg/Slideshow.svg';

const SlideshowIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Slideshow/>
	</Icon19>;

export default SlideshowIcon;
