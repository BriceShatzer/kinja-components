// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import SearchVideo from './svg/SearchVideo.svg';

const SearchVideoIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<SearchVideo/>
	</Icon19>;

export default SearchVideoIcon;
