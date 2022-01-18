// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Redo from './svg/UndoRedo/Redo.svg';

const RedoIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Redo/>
	</Icon19>;

export default RedoIcon;
