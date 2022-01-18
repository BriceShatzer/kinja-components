// @flow

import * as React from 'react';

import Icon19 from './icon19';
import type { Icon19Type } from './icon19';
import Pagebreak from './svg/Pagebreak.svg';

const PagebreakIcon = (props: Icon19Type) =>
	<Icon19 {...props}>
		<Pagebreak/>
	</Icon19>;

export default PagebreakIcon;
