// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Embiggen from './svg/Embiggen/Embiggen.svg';

const EmbiggenIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Embiggen/>
	</Icon19>;

export default EmbiggenIcon;
