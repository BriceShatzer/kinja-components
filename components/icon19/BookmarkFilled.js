// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import BookmarkFilled from './svg/Bookmark/BookmarkFilled.svg';

const BookmarkFilledIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<BookmarkFilled/>
	</Icon19>;

export default BookmarkFilledIcon;
