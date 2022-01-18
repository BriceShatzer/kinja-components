// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Video from './svg/Video/Video.svg';

const VideoIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Video/>
	</Icon19>;

export default VideoIcon;
