// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Search from './svg/Search/Search.svg';

const SearchIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Search/>
	</Icon19>;

export default SearchIcon;
