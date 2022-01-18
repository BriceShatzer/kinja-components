// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import RecommendedStories from './svg/RecommendedStories.svg';

const RecommendedStoriesIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<RecommendedStories/>
	</Icon19>;

export default RecommendedStoriesIcon;
