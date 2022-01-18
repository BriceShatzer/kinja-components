// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Review from './svg/Review.svg';

const ReviewIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Review/>
	</Icon19>;

export default ReviewIcon;
