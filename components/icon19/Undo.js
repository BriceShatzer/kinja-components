// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Undo from './svg/UndoRedo/Undo.svg';

const UndoIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Undo/>
	</Icon19>;

export default UndoIcon;
