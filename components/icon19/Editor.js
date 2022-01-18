// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Editor from './svg/Editor.svg';

const EditorIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Editor/>
	</Icon19>;

export default EditorIcon;
