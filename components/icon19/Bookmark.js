// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Bookmark from './svg/Bookmark/Bookmark.svg';

const BookmarkIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Bookmark/>
	</Icon19>;

export default BookmarkIcon;
