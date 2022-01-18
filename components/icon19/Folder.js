// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Folder from './svg/Folder.svg';

const FolderIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Folder/>
	</Icon19>;

export default FolderIcon;
