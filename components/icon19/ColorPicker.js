// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import ColorPicker from './svg/ColorPicker.svg';

const ColorPickerIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<ColorPicker/>
	</Icon19>;

export default ColorPickerIcon;
